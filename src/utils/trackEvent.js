/**
 * trackEvent — Revamp Consulting LLC
 *
 * Lightweight analytics helper. Forwards events to any analytics platform
 * that is attached to the page. Falls back to console.log in development.
 *
 * Supported targets (activate by pasting the relevant script into index.html):
 *   - Google Tag Manager  → window.dataLayer
 *   - Google Analytics 4  → window.gtag
 *   - Meta Pixel          → window.fbq
 *
 * Usage:
 *   import trackEvent from '../utils/trackEvent';
 *   trackEvent('hero_cta_click');
 *   trackEvent('form_submission_success', { service: 'Strategy & Transformation' });
 */

/**
 * @param {string} eventName  — snake_case event identifier
 * @param {object} [params]   — optional extra properties merged into the payload
 */
export default function trackEvent(eventName, params = {}) {
    const payload = {
        event: eventName,
        page_url: window.location.href,
        timestamp: new Date().toISOString(),
        ...params,
    };

    // ── Google Tag Manager ────────────────────────────────────────────────────
    // Uncomment GTM snippet in index.html to activate.
    if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
        window.dataLayer.push(payload);
    }

    // ── Google Analytics 4 (direct / without GTM) ────────────────────────────
    // Uncomment GA4 snippet in index.html and replace G-XXXXXXXXXX to activate.
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
    }

    // ── Meta Pixel ────────────────────────────────────────────────────────────
    // Uncomment Meta Pixel snippet in index.html and replace YOUR_PIXEL_ID to activate.
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('trackCustom', eventName, params);
    }

    // ── Dev fallback ──────────────────────────────────────────────────────────
    if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.log('[Revamp Analytics]', eventName, payload);
    }
}

// ─── Tracked Events Reference ─────────────────────────────────────────────────
//
//  navbar_cta_click          — Navbar "Book a Consultation" button
//  hero_cta_click            — Hero section primary CTA
//  engagement_cta_click      — Engagement Models "Book a Consultation" CTA
//  content_engine_cta_click  — Content Engine section CTA
//  booking_click             — CalendlyPlaceholder "Book a Consultation" button
//  form_submission_success   — Lead form submitted successfully
//  form_submission_error     — Lead form submission failed
