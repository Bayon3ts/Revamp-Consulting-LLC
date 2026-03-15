import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import trackEvent from '../utils/trackEvent';

// ── Calendly Configuration ────────────────────────────────────────────────────
// Replace the placeholder below with your live Calendly URL when ready.
// e.g. "https://calendly.com/revamp-consulting/30min"
//
// To add an inline embed widget instead:
//   1. Install the Calendly embed lib:  npm install react-calendly
//   2. Import: import { InlineWidget } from 'react-calendly';
//   3. Replace the <a> button with: <InlineWidget url={CALENDLY_URL} />
const CALENDLY_URL = '#'; // ← paste your Calendly link here

export default function CalendlyPlaceholder() {
    const handleClick = () => {
        trackEvent('booking_click', { destination: CALENDLY_URL });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 p-7 rounded-sm bg-white/5 border border-[#C8A96E]/25 relative overflow-hidden"
        >
            {/* Subtle gold glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(200,169,110,0.08) 0%, transparent 65%)' }}
            />

            {/* Top accent line */}
            <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: 'linear-gradient(to right, #C8A96E, rgba(200,169,110,0.2), transparent)' }}
            />

            <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
                {/* Icon */}
                <div className="w-11 h-11 rounded-sm bg-[#C8A96E]/15 border border-[#C8A96E]/25 flex items-center justify-center flex-shrink-0">
                    <Calendar size={18} className="text-[#C8A96E]" />
                </div>

                {/* Copy */}
                <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm mb-0.5">
                        Prefer to pick a time directly?
                    </p>
                    <p className="text-[#7A8C9E] text-xs leading-relaxed">
                        Skip the form and book a 30-minute discovery call with our team at a time that suits you.
                    </p>
                </div>

                {/* CTA */}
                <motion.a
                    href={CALENDLY_URL}
                    target={CALENDLY_URL !== '#' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    onClick={handleClick}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 flex-shrink-0
                               px-5 py-2.5 rounded-sm
                               bg-[#C8A96E] hover:bg-[#B8956A] text-[#0B1F3A]
                               text-sm font-semibold tracking-wide
                               transition-colors duration-200 cursor-pointer
                               shadow-lg shadow-[#C8A96E]/20"
                    aria-label="Book a consultation call"
                >
                    Book a Consultation
                    <ArrowRight size={14} />
                </motion.a>
            </div>
        </motion.div>
    );
}
