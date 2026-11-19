// ─────────────────────────────────────────────────────────────────────────
// Kontaktformular → eigene Netlify-Funktion (netlify/functions/kontakt.mjs)
// → Resend → info-kalac-trockenbau@web.de
// Der Resend-Schlüssel liegt nur in Netlify (RESEND_API_KEY), nie im Browser.
// ─────────────────────────────────────────────────────────────────────────

const ENDPOINT = "/.netlify/functions/kontakt";

// Zeitpunkt, ab dem die Seite geladen ist (Spamschutz: Bots senden sofort)
const SEITE_GELADEN = Date.now();

/**
 * Sendet eine Kontaktanfrage.
 * @param {Record<string, string>} fields - Lesbare Feldnamen → Werte
 *   (Vorname, Nachname, E-Mail, Telefon, Projektart, Beschreibung, website = verstecktes Feld)
 * @returns {Promise<object>} Antwort bei Erfolg
 */
export async function sendContactForm(fields) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ ...fields, _start: SEITE_GELADEN }),
  });

  let data = {};
  try {
    data = await res.json();
  } catch {
    // keine JSON-Antwort
  }
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Senden fehlgeschlagen.");
  }
  return data;
}
