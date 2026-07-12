import trackEvent from '../utils/trackEvent';

const CALENDLY_URL = 'https://calendly.com/admin-revampinsights';

export default function CalendlyPlaceholder() {
    const handleClick = (e) => {
        e.preventDefault();
        trackEvent('booking_click', { destination: CALENDLY_URL });
        if (window.Calendly) {
            window.Calendly.initPopupWidget({ url: CALENDLY_URL });
        } else {
            window.open(CALENDLY_URL, '_blank');
        }
    };

    return (
        <p className="text-[#6A7D90] text-sm mb-6">
            Prefer to pick a time now?{' '}
            <span
                role="button"
                tabIndex={0}
                onClick={handleClick}
                onKeyDown={(e) => e.key === 'Enter' && handleClick(e)}
                className="text-[#C8A96E] font-semibold cursor-pointer underline underline-offset-2 hover:text-[#D4BC8A] transition-colors duration-200"
                aria-label="Book a consultation call on Calendly"
            >
                Book a time directly →
            </span>
        </p>
    );
}