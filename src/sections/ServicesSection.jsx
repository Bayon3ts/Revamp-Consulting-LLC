import { motion, useInView } from 'framer-motion';
import { Lightbulb, BarChart3, TrendingUp, Rocket, GraduationCap, Globe } from 'lucide-react';
import { useRef } from 'react';

// ─── 6 curated core capabilities ─────────────────────────────────────────────

const CAPABILITIES = [
    {
        id:          'strategy',
        Icon:        Lightbulb,
        title:       'Strategic Advisory',
        description: 'High-level counsel on corporate direction, competitive positioning, and long-term value creation for executives and boards.',
        outcome:     'Clarity on where to compete and how to win.',
        accent:      { bg: 'bg-[#0B1F3A]', icon: 'text-[#C8A96E]', hover: 'group-hover:bg-[#C8A96E] group-hover:text-[#0B1F3A]' },
    },
    {
        id:          'transformation',
        Icon:        Rocket,
        title:       'Business Transformation',
        description: 'End-to-end programme leadership that moves organizations from legacy operating models to high-performance structures.',
        outcome:     'Measurable change that sticks.',
        accent:      { bg: 'bg-[#C8A96E]/12', icon: 'text-[#8B6914]', hover: 'group-hover:bg-[#8B6914] group-hover:text-white' },
    },
    {
        id:          'finance',
        Icon:        BarChart3,
        title:       'Financial Strategy',
        description: 'Rigorous financial modelling, scenario planning, and capital allocation advisory that sharpens investment decision-making.',
        outcome:     'Smarter capital, stronger returns.',
        accent:      { bg: 'bg-[#1A4A6E]/10', icon: 'text-[#1A4A6E]', hover: 'group-hover:bg-[#1A4A6E] group-hover:text-white' },
    },
    {
        id:          'growth',
        Icon:        TrendingUp,
        title:       'Growth & Market Expansion',
        description: 'Revenue acceleration through market entry strategy, pipeline architecture, and brand positioning for competitive markets.',
        outcome:     'New revenue streams, faster.',
        accent:      { bg: 'bg-[#0B1F3A]', icon: 'text-[#C8A96E]', hover: 'group-hover:bg-[#C8A96E] group-hover:text-[#0B1F3A]' },
    },
    {
        id:          'leadership',
        Icon:        GraduationCap,
        title:       'Executive Leadership',
        description: 'Leadership development, C-suite coaching, and organisational capability building for teams navigating complex growth environments.',
        outcome:     'Stronger leaders at every level.',
        accent:      { bg: 'bg-[#C8A96E]/12', icon: 'text-[#8B6914]', hover: 'group-hover:bg-[#0B1F3A] group-hover:text-[#C8A96E]' },
    },
    {
        id:          'technology',
        Icon:        Globe,
        title:       'Technology & Product',
        description: 'Digital strategy, product roadmap advisory, and technology governance that align engineering investment with business outcomes.',
        outcome:     'Technology that drives, not just supports.',
        accent:      { bg: 'bg-[#1A4A6E]/10', icon: 'text-[#1A4A6E]', hover: 'group-hover:bg-[#C8A96E] group-hover:text-[#0B1F3A]' },
    },
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const fadeUpVariants = {
    hidden:  { opacity: 0, y: 36, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
        transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Capability Card ──────────────────────────────────────────────────────────

function CapabilityCard({ cap, index }) {
    const ref    = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 44, filter: 'blur(8px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.78, delay: (index % 3) * 0.11, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-sm p-7 cursor-default flex flex-col
                       border border-[#0B1F3A]/[0.08]
                       bg-white/55 backdrop-blur-md
                       shadow-sm shadow-[#0B1F3A]/[0.04]
                       hover:border-[#C8A96E]/40 hover:bg-white/75
                       hover:shadow-xl hover:shadow-[#0B1F3A]/[0.08] hover:-translate-y-1.5
                       transition-all duration-500"
        >
            {/* Top accent bar */}
            <div
                className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ background: 'linear-gradient(to right, #C8A96E, rgba(200,169,110,0.15), transparent)' }}
            />

            {/* Corner bracket */}
            <div className="absolute top-0 left-0 w-8 h-8 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-px h-5 bg-gradient-to-b from-[#C8A96E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 h-px w-5 bg-gradient-to-r from-[#C8A96E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 20% 10%, rgba(200,169,110,0.06) 0%, transparent 65%)' }}
            />

            {/* Ghost number */}
            <span className="absolute top-5 right-5 text-[2.6rem] font-bold leading-none select-none tracking-tight
                             text-[#0B1F3A]/[0.04] group-hover:text-[#C8A96E]/12 transition-colors duration-500">
                {String(index + 1).padStart(2, '0')}
            </span>

            {/* Icon */}
            <div className={`relative w-11 h-11 rounded-sm flex items-center justify-center mb-5
                             border border-transparent transition-all duration-300
                             ${cap.accent.bg} ${cap.accent.hover}`}>
                <cap.Icon size={19} className={`transition-colors duration-300 ${cap.accent.icon} group-hover:text-inherit`} />
            </div>

            {/* Title */}
            <h3 className="text-[#0B1F3A] font-bold text-base mb-2.5 leading-snug tracking-tight">
                {cap.title}
            </h3>

            {/* Description */}
            <p className="text-[#6A7D90] text-sm leading-relaxed font-light mb-5 flex-1">
                {cap.description}
            </p>

            {/* Outcome tag — the "so what" — anchored to bottom */}
            <div className="flex items-center gap-2 pt-4 border-t border-[#0B1F3A]/[0.06] group-hover:border-[#C8A96E]/20 transition-colors duration-300">
                <div className="w-1 h-1 rounded-full bg-[#C8A96E]/50 flex-shrink-0 group-hover:bg-[#C8A96E] transition-colors duration-300" />
                <span className="text-[#9A8060] text-xs font-semibold italic tracking-wide group-hover:text-[#C8A96E] transition-colors duration-300">
                    {cap.outcome}
                </span>
            </div>
        </motion.div>
    );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function ServicesSection() {
    const headerRef    = useRef(null);
    const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

    return (
        <section
            id="services"
            className="relative overflow-hidden bg-white pt-0 pb-28 md:pb-36"
            aria-labelledby="services-title"
        >
            {/* Subtle background */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div
                    className="absolute inset-0 opacity-[0.022]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(11,31,58,0.8) 1px, transparent 1px)',
                        backgroundSize: '36px 36px',
                    }}
                />
                <div className="absolute -right-56 top-0 w-[600px] h-[600px] rounded-full opacity-[0.05]"
                    style={{ background: 'radial-gradient(circle, rgba(200,169,110,0.8) 0%, transparent 65%)' }} />
                <div className="absolute -left-40 bottom-0 w-[500px] h-[500px] rounded-full opacity-[0.04]"
                    style={{ background: 'radial-gradient(circle, rgba(11,31,58,0.8) 0%, transparent 65%)' }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

                {/* ── Header ── */}
                <motion.div
                    ref={headerRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate={headerInView ? 'visible' : 'hidden'}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-16"
                >
                    <div className="max-w-xl">
                        <motion.div variants={fadeUpVariants} className="mb-4">
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm
                                             bg-[#C8A96E]/10 border border-[#C8A96E]/25
                                             text-[#C8A96E] text-xs font-semibold tracking-[0.2em] uppercase">
                                <motion.span
                                    animate={{ opacity: [1, 0.25, 1] }}
                                    transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                                    className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]"
                                />
                                Core Capabilities
                            </span>
                        </motion.div>

                        <motion.h2
                            variants={fadeUpVariants}
                            id="services-title"
                            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-4"
                        >
                            <span className="text-[#0B1F3A]">Where We</span>
                            <br />
                            <span className="text-[#C8A96E]">Create Impact</span>
                        </motion.h2>

                        <motion.div
                            variants={{
                                hidden:  { scaleX: 0, opacity: 0 },
                                visible: { scaleX: 1, opacity: 1,
                                    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
                            }}
                            style={{ originX: 0, background: 'linear-gradient(to right, #C8A96E, rgba(200,169,110,0.2), transparent)' }}
                            className="h-[2px] w-16"
                        />
                    </div>

                    <motion.p
                        variants={fadeUpVariants}
                        className="text-[#7A8C9E] text-sm md:text-base leading-relaxed max-w-sm md:text-right font-light"
                    >
                        Six capabilities. Deep expertise in each. We don't do everything —
                        we do the things that move the needle.
                    </motion.p>
                </motion.div>

                {/* ── 3-col grid, 2 rows = 6 cards ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {CAPABILITIES.map((cap, index) => (
                        <CapabilityCard key={cap.id} cap={cap} index={index} />
                    ))}
                </div>

                {/* ── Bottom strip ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4
                               pt-8 border-t border-[#0B1F3A]/[0.07]"
                >
                    <p className="text-[#7A8C9E] text-sm font-light">
                        Not sure which capability fits your challenge?{' '}
                        <span className="text-[#0B1F3A] font-semibold">Let's find out together.</span>
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                            const el = document.querySelector('#consultation');
                            if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-2.5 bg-[#0B1F3A] hover:bg-[#0D2340]
                                   text-white font-semibold text-sm px-6 py-3 rounded-sm
                                   transition-colors duration-200 flex-shrink-0 group"
                        style={{ boxShadow: '0 4px 20px rgba(11,31,58,0.18)' }}
                    >
                        Book a Consultation
                        <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                            className="inline-flex"
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </motion.span>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}