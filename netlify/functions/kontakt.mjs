// Kontaktformular → Resend → Postfach von K.M. Trockenbau
//
// Umgebungsvariablen in Netlify (Site configuration → Environment variables):
//   RESEND_API_KEY      Pflicht. Schlüssel aus resend.com (nur "Sending access").
//   KONTAKT_EMPFAENGER  optional, Standard: info-kalac-trockenbau@web.de
//   KONTAKT_ABSENDER    optional, Standard: K.M. Trockenbau Website <formular@k-m-trockenbau.de>
//                       (Domain muss in Resend verifiziert sein)

const EMPFAENGER = process.env.KONTAKT_EMPFAENGER || "info-kalac-trockenbau@web.de";
const ABSENDER =
  process.env.KONTAKT_ABSENDER || "K.M. Trockenbau Website <formular@k-m-trockenbau.de>";

// Reihenfolge und erlaubte Felder in der Mail
const FELDER = ["Vorname", "Nachname", "E-Mail", "Telefon", "Projektart", "Beschreibung"];
const MAX_LAENGE = 5000;

const antwort = (status, daten) =>
  new Response(JSON.stringify(daten), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

const html = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const einzeilig = (s) => String(s).replace(/[\r\n]+/g, " ").trim();

export default async (req) => {
  if (req.method !== "POST") return antwort(405, { success: false, message: "Nur POST." });

  let eingabe;
  try {
    eingabe = await req.json();
  } catch {
    return antwort(400, { success: false, message: "Ungültige Anfrage." });
  }

  // Spamschutz 1: verstecktes Feld, das Menschen nie ausfüllen
  if (eingabe.website) return antwort(200, { success: true });

  // Spamschutz 2: Formular schneller als 3 Sekunden abgeschickt = Bot
  const start = Number(eingabe._start);
  if (start && Date.now() - start < 3000) return antwort(200, { success: true });

  const felder = {};
  for (const name of FELDER) {
    const wert = eingabe[name] == null ? "" : String(eingabe[name]).trim();
    felder[name] = wert.slice(0, MAX_LAENGE);
  }

  if (!felder.Vorname && !felder.Nachname) {
    return antwort(400, { success: false, message: "Bitte geben Sie Ihren Namen an." });
  }
  if (!felder.Telefon && !felder["E-Mail"]) {
    return antwort(400, { success: false, message: "Bitte Telefon oder E-Mail angeben." });
  }

  const email = felder["E-Mail"];
  const emailGueltig = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email);

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY fehlt");
    return antwort(500, { success: false, message: "Versand ist gerade nicht möglich." });
  }

  const name = einzeilig([felder.Vorname, felder.Nachname].filter(Boolean).join(" "));
  const betreff = `Neue Anfrage über die Website von ${name}`.slice(0, 200);

  const zeilen = FELDER.filter((n) => felder[n] && felder[n] !== "-");
  const text = zeilen.map((n) => `${n}: ${felder[n]}`).join("\n\n");
  const htmlInhalt = `
    <div style="font-family:Arial,sans-serif;font-size:15px;color:#0D2020">
      <h2 style="color:#5AACB5;margin:0 0 16px">Neue Anfrage über k-m-trockenbau.de</h2>
      <table cellpadding="8" style="border-collapse:collapse">
        ${zeilen
          .map(
            (n) => `<tr>
              <td style="vertical-align:top;font-weight:bold;border-bottom:1px solid #e5e5e5">${html(n)}</td>
              <td style="border-bottom:1px solid #e5e5e5;white-space:pre-wrap">${html(felder[n])}</td>
            </tr>`
          )
          .join("")}
      </table>
      <p style="color:#888;font-size:12px;margin-top:24px">
        ${emailGueltig ? "Auf diese Mail antworten geht direkt an den Absender der Anfrage." : "Keine gültige E-Mail angegeben, bitte telefonisch melden."}
      </p>
    </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: ABSENDER,
      to: [EMPFAENGER],
      subject: betreff,
      text,
      html: htmlInhalt,
      ...(emailGueltig ? { reply_to: email } : {}),
    }),
  });

  if (!res.ok) {
    console.error("Resend-Fehler", res.status, await res.text());
    return antwort(502, { success: false, message: "Senden fehlgeschlagen." });
  }

  return antwort(200, { success: true });
};
