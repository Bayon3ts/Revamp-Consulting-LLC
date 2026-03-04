/**
 * submitLeadForm — Revamp Consulting LLC
 *
 * Sends lead form data to adekunle.olusanya@yahoo.com via EmailJS.
 *
 * ── Setup ─────────────────────────────────────────────────────────────────────
 * 1. Create a free account at https://www.emailjs.com
 * 2. Add your Yahoo email as a service
 * 3. Create an email template using the variables listed below
 * 4. Add these to your .env.local file:
 *
 *    VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
 *    VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
 *    VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
 *
 * ── Template Variables (use these in your EmailJS template) ───────────────────
 *    {{fullName}}            — sender's full name
 *    {{companyName}}         — organization name
 *    {{email}}               — reply-to email
 *    {{phone}}               — phone number
 *    {{serviceInterestedIn}} — selected service
 *    {{businessChallenge}}   — their message / challenge
 *    {{submittedAt}}         — submission timestamp
 *    {{pageUrl}}             — page they submitted from
 *
 * ── Anti-Spam ─────────────────────────────────────────────────────────────────
 *    Honeypot field (_hp) — discard any submission where _hp is non-empty.
 */

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Optional: Zapier / Make / Airtable webhook as an alternative
const WEBHOOK_ENDPOINT = import.meta.env.VITE_LEAD_FORM_ENDPOINT;

/**
 * Loads the EmailJS SDK dynamically (no npm install needed).
 */
function loadEmailJS() {
    return new Promise((resolve, reject) => {
        if (window.emailjs) { resolve(); return; }
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load EmailJS SDK'));
        document.head.appendChild(script);
    });
}

/**
 * @typedef {object} LeadPayload
 * @property {string} fullName
 * @property {string} [companyName]
 * @property {string} email
 * @property {string} [phone]
 * @property {string} serviceInterestedIn
 * @property {string} businessChallenge
 * @property {string} [_hp]
 */

/**
 * Submits a lead form to EmailJS (primary) or a webhook (fallback).
 *
 * @param {LeadPayload} formData
 * @returns {Promise<{ ok: boolean, data?: any, error?: string }>}
 */
export async function submitLeadForm(formData) {
    // ── Honeypot check ─────────────────────────────────────────────────────────
    if (formData._hp) {
        // Silently reject bots — pretend success
        return { ok: true, data: { bot: true } };
    }

    const payload = {
        fullName:            formData.fullName,
        companyName:         formData.companyName || '—',
        email:               formData.email,
        phone:               formData.phone || '—',
        serviceInterestedIn: formData.serviceInterestedIn,
        businessChallenge:   formData.businessChallenge,
        submittedAt:         new Date().toLocaleString('en-GB', { timeZone: 'Africa/Lagos' }) + ' WAT',
        pageUrl:             window.location.href,
    };

    // ── Path A: EmailJS ────────────────────────────────────────────────────────
    if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
        try {
            await loadEmailJS();
            window.emailjs.init({ publicKey: PUBLIC_KEY });

            const response = await window.emailjs.send(SERVICE_ID, TEMPLATE_ID, payload);

            if (response.status === 200) {
                return { ok: true, data: response };
            } else {
                return { ok: false, error: `EmailJS error: ${response.text}` };
            }
        } catch (err) {
            console.error('[Revamp Lead Capture] EmailJS failed:', err);
            // Fall through to webhook if available
            if (!WEBHOOK_ENDPOINT) {
                return { ok: false, error: err.message || 'Failed to send email.' };
            }
        }
    }

    // ── Path B: Webhook (Zapier / Make / Airtable) ─────────────────────────────
    if (WEBHOOK_ENDPOINT) {
        try {
            const response = await fetch(WEBHOOK_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const text = await response.text().catch(() => '');
                return { ok: false, error: `Webhook error ${response.status}: ${text}` };
            }

            const data = await response.json().catch(() => ({}));
            return { ok: true, data };
        } catch (err) {
            return { ok: false, error: err.message || 'Network error' };
        }
    }

    // ── Dev mode: no credentials configured ───────────────────────────────────
    console.log('[Revamp Lead Capture] No EmailJS or webhook configured.');
    console.log('[Revamp Lead Capture] Payload:', payload);
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { ok: true, data: { simulated: true } };
}