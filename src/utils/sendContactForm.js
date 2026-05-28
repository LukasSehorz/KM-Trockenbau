// ─────────────────────────────────────────────────────────────────────────
// Web3Forms Access Key
// Hol dir deinen kostenlosen Key auf https://web3forms.com (mit der Ziel-Mail
// Lukas.sehorz@hotmail.com) und trage ihn hier ein. Der Key darf öffentlich
// sein – er ist für den Einsatz im Frontend gedacht.
// ─────────────────────────────────────────────────────────────────────────
const WEB3FORMS_ACCESS_KEY = "194a0148-1ef6-4604-a339-0d80940f2e69";

const ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Sendet eine Kontaktanfrage über Web3Forms.
 * @param {Record<string, string>} fields - Lesbare Feldnamen → Werte
 * @returns {Promise<object>} Web3Forms-Antwort bei Erfolg
 */
export async function sendContactForm(fields) {
  const name = [fields.Vorname, fields.Nachname].filter(Boolean).join(" ").trim();

  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: name ? `Neue Anfrage von ${name}` : "Neue Anfrage über die Website",
    from_name: "K.M. Trockenbau Website",
    ...(fields["E-Mail"] ? { replyto: fields["E-Mail"] } : {}),
    ...fields,
  };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || "Senden fehlgeschlagen.");
  }
  return data;
}
