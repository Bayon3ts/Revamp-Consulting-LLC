/**
 * submitLeadForm — Revamp Consulting LLC
 *
 * Multi-channel lead capture:
 *   1. HubSpot CRM (v3 Contacts API) — primary
 *   2. Webhook (Zapier / Make / Airtable) — fallback (currently disabled, see commented block below)
 *   3. Dev-log mode — when no credentials are configured
 *
 * ── HubSpot Setup ─────────────────────────────────────────────────────────────
 * The form uses the public HubSpot Forms Submissions API.
 * Ensure you have these in your .env.local:
 *   VITE_HUBSPOT_PORTAL_ID=your_portal_id
 *   VITE_HUBSPOT_FORM_GUID=your_form_guid
 *
 * ── Custom Properties ─────────────────────────────────────────────────────────
 * Ensure these custom properties exist in your HubSpot portal
 * (Settings → Properties → Contact Properties → Create Property):
 *   • service_interested_in  (Single-line text or Dropdown)
 *   • business_challenge     (Multi-line text)
 *
 * ── Resend API Setup ─────────────────────────────────────────────────────────────
 * 1. Ensure RESEND_API_KEY is configured in your .env.local and Vercel project
 * 2. Vercel Serverless Function proxy is located at /api/send-email
 *
 * ── Template Variables (sent to API payload) ───────────────────────────────────
 *    fullName            — sender's full name
 *    firstname           — sender's first name
 *    companyName         — organization name
 *    email               — reply-to email
 *    phone               — phone number
 *    serviceInterestedIn — selected service
 *    businessChallenge   — their message / challenge
 *    submittedAt         — submission timestamp
 *    pageUrl             — page they submitted from
 *
 * ── Anti-Spam ─────────────────────────────────────────────────────────────────
 *    Honeypot field (_hp) — discard any submission where _hp is non-empty.
 */

// ── HubSpot ────────────────────────────────────────────────────────────────────
const HUBSPOT_PORTAL_ID = import.meta.env.VITE_HUBSPOT_PORTAL_ID;
const HUBSPOT_FORM_GUID = import.meta.env.VITE_HUBSPOT_FORM_GUID;
const HUBSPOT_API_BASE  = 'https://api.hsforms.com';

// ── Webhook ────────────────────────────────────────────────────────────────────
const WEBHOOK_ENDPOINT = import.meta.env.VITE_LEAD_FORM_ENDPOINT;

// ── Helpers ────────────────────────────────────────────────────────────────────

/**
 * Splits a full name string into { firstname, lastname }.
 * If only one word is provided, lastname is set to an empty string.
 */
function splitName(fullName) {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length <= 1) {
        return { firstname: parts[0] || '', lastname: '' };
    }
    return {
        firstname: parts[0],
        lastname: parts.slice(1).join(' '),
    };
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
 * Submits a lead form to HubSpot (primary) or a webhook (fallback, currently disabled).
 *
 * @param {LeadPayload} formData
 * @returns {Promise<{ ok: boolean, data?: any, error?: string }>}
 */
export async function submitLeadForm(formData) {
    if (!HUBSPOT_PORTAL_ID || !HUBSPOT_FORM_GUID) {
        console.warn('[Revamp Lead Capture] HubSpot is not configured — VITE_HUBSPOT_PORTAL_ID and/or VITE_HUBSPOT_FORM_GUID are missing. Leads will not be captured in HubSpot until these are set.');
    }

    // ── Honeypot check ─────────────────────────────────────────────────────────
    if (formData._hp) {
        // Silently reject bots — pretend success
        return { ok: true, data: { bot: true } };
    }

    const { firstname, lastname } = splitName(formData.fullName);

    // ── Path A: HubSpot Forms Submissions API ─────────────────────────────────
    let hubspotSuccess = false;
    let rawText = '';

    if (HUBSPOT_PORTAL_ID && HUBSPOT_FORM_GUID) {
        try {
            const hubspotPayload = {
                fields: [
                    { name: 'firstname',             value: firstname },
                    { name: 'lastname',              value: lastname },
                    { name: 'email',                 value: formData.email },
                    { name: 'company',               value: formData.companyName || '' },
                    { name: 'phone',                 value: formData.phone || '' },
                    { name: 'service_interested_in', value: formData.serviceInterestedIn || '' },
                    { name: 'business_challenge',    value: formData.businessChallenge || '' },
                ],
                context: {
                    pageUri: window.location.href,
                    pageName: document.title
                }
            };

            const response = await fetch(`${HUBSPOT_API_BASE}/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(hubspotPayload),
            });

            rawText = await response.text();

            if (response.ok) {
                console.log('[Revamp Lead Capture] HubSpot form submitted successfully.');
                hubspotSuccess = true;
            } else {
                console.error('[Revamp Lead Capture] HubSpot error:', rawText);
                return { ok: false, error: `HubSpot API error (${response.status}): ${rawText}` };
            }
        } catch (err) {
            console.error('[Revamp Lead Capture] HubSpot fetch failed:', err);
            return { ok: false, error: err.message || 'Network error — please try again.' };
        }
    } else {
        console.log('[Revamp Lead Capture] No HubSpot configured. Simulating CRM success.');
        await new Promise((resolve) => setTimeout(resolve, 800)); // simulate network delay
    }

    // Fire Resend email notification in the background (non-blocking)
    _sendEmailNotification(formData, firstname, lastname);

    return { ok: true, data: hubspotSuccess ? rawText : { simulated: true } };
}

// ── Private Helpers ────────────────────────────────────────────────────────────

/**
 * Builds the payload for email / webhook notification.
 */
function _buildEmailPayload(formData, firstname, lastname) {
    return {
        fullName:            formData.fullName,
        firstname:           firstname,
        lastname:            lastname,
        companyName:         formData.companyName || '—',
        email:               formData.email,
        phone:               formData.phone || '—',
        serviceInterestedIn: formData.serviceInterestedIn,
        businessChallenge:   formData.businessChallenge,
        submittedAt:         new Date().toLocaleString('en-GB', { timeZone: 'Africa/Lagos' }) + ' WAT',
        pageUrl:             window.location.href,
    };
}


/**
 * Fires Resend email notifications (via Vercel Serverless Function) 
 * in the background (non-blocking).
 * Used alongside HubSpot so you still get email alerts.
 */
async function _sendEmailNotification(formData, firstname, lastname) {
    const payload = _buildEmailPayload(formData, firstname, lastname);

    try {
        const promises = [];

        // Email A: Internal Alert
        promises.push(
            fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'internal', payload })
            }).catch(err => {
                console.warn('[Revamp Lead Capture] Internal email notification failed:', err);
            })
        );

        // Email B: Lead Confirmation
        promises.push(
            fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'confirmation', payload })
            }).catch(err => {
                console.warn('[Revamp Lead Capture] Lead confirmation email failed:', err);
            })
        );

        // Fire and forget (don't block waiting for emails to finish)
        Promise.all(promises).then(async (responses) => {
            for (const res of responses) {
                if (res && !res.ok) {
                    const text = await res.text().catch(() => '');
                    console.warn(`[Revamp Lead Capture] Email API returned ${res.status}:`, text);
                }
            }
            console.log('[Revamp Lead Capture] All Resend email notifications processed.');
        });

    } catch (err) {
        // Non-critical — HubSpot already captured the lead
        console.warn('[Revamp Lead Capture] Error triggering email notifications:', err);
    }
}