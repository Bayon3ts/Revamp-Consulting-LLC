/**
 * submitLeadForm — Revamp Consulting LLC
 *
 * Handles lead form submission. Reads the endpoint from an environment variable
 * so no sensitive keys are ever committed to the repository.
 *
 * ── How to connect ────────────────────────────────────────────────────────────
 *
 * 1. Copy .env.example → .env.local  (git-ignored)
 * 2. Set VITE_LEAD_FORM_ENDPOINT to one of:
 *      • Airtable automation webhook URL
 *          e.g. https://hooks.airtable.com/workflows/v1/...
 *      • Make (Integromat) webhook URL
 *          e.g. https://hook.eu1.make.com/...
 *      • Zapier webhook URL
 *          e.g. https://hooks.zapier.com/hooks/catch/...
 *      • Your own backend API route
 *          e.g. https://api.revampconsulting.ng/leads
 *
 * ── CRM Lead Stages (use in Airtable / Make / Zapier field mapping) ────────────
 *
 *   New Lead → Contacted → Consultation Booked → Proposal Sent →
 *   Negotiation → Won → Lost
 *
 * ── Payload Shape ─────────────────────────────────────────────────────────────
 *
 *  {
 *    fullName:            string   (required)
 *    companyName:         string   (optional)
 *    email:               string   (required)
 *    phone:               string   (optional)
 *    serviceInterestedIn: string   (required — see SERVICES list below)
 *    businessChallenge:   string   (required)
 *    source:              "revamp-landing-page"
 *    submittedAt:         ISO 8601 timestamp
 *    pageUrl:             current window URL
 *    _hp:                 string   (honeypot — server should discard if non-empty)
 *  }
 *
 * ── Anti-Spam ─────────────────────────────────────────────────────────────────
 *
 *  A hidden honeypot field (_hp) is included.
 *  At your webhook/backend, discard any submission where _hp is non-empty.
 *  Before production launch, add Cloudflare Turnstile or equivalent.
 */

const ENDPOINT = import.meta.env.VITE_LEAD_FORM_ENDPOINT;

/**
 * @typedef {object} LeadPayload
 * @property {string} fullName
 * @property {string} [companyName]
 * @property {string} email
 * @property {string} [phone]
 * @property {string} serviceInterestedIn
 * @property {string} businessChallenge
 * @property {string} [_hp]             — honeypot
 */

/**
 * Submits a lead form payload to the configured endpoint.
 *
 * @param {LeadPayload} formData
 * @returns {Promise<{ ok: boolean, data?: any, error?: string }>}
 */
export async function submitLeadForm(formData) {
    const payload = {
        fullName: formData.fullName,
        companyName: formData.companyName || '',
        email: formData.email,
        phone: formData.phone || '',
        serviceInterestedIn: formData.serviceInterestedIn,
        businessChallenge: formData.businessChallenge,
        source: 'revamp-landing-page',
        submittedAt: new Date().toISOString(),
        pageUrl: window.location.href,
        _hp: formData._hp || '',
    };

    // ── Dev mode: no endpoint configured ──────────────────────────────────────
    if (!ENDPOINT) {
        // eslint-disable-next-line no-console
        console.log('[Revamp Lead Capture] No endpoint configured (VITE_LEAD_FORM_ENDPOINT is empty).');
        // eslint-disable-next-line no-console
        console.log('[Revamp Lead Capture] Payload that would be sent:', payload);
        // Simulate success in dev so the rest of the flow can be tested
        await new Promise((resolve) => setTimeout(resolve, 800));
        return { ok: true, data: { simulated: true } };
    }

    // ── Production: POST to configured endpoint ────────────────────────────────
    try {
        const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const text = await response.text().catch(() => '');
            return { ok: false, error: `Server responded with ${response.status}: ${text}` };
        }

        const data = await response.json().catch(() => ({}));
        return { ok: true, data };
    } catch (err) {
        return { ok: false, error: err.message || 'Network error' };
    }
}
