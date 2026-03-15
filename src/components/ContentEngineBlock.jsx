import { motion, useInView } from 'framer-motion';
import { Linkedin, Twitter, Instagram, ArrowRight, PenLine, Share2, Target, Users } from 'lucide-react';
import { useRef } from 'react';
import trackEvent from '../utils/trackEvent';

// ── Data ──────────────────────────────────────────────────────────────────────

const STEPS = [
    { Icon: PenLine, label: 'Content Planning',          number: '01' },
    { Icon: Target,  label: 'Post Creation',             number: '02' },
    { Icon: Share2,  label: 'Multi-Platform Scheduling', number: '03' },
    { Icon: Users,   label: 'Lead Capture',              number: '04' },
];

const PLATFORMS = [
    { label: 'LinkedIn',   badge: 'Primary',   Icon: Linkedin,  color: '#C8A96E' },
    { label: 'X / Twitter', badge: 'Secondary', Icon: Twitter,   color: '#7A8C9E' },
    { label: 'Instagram',  badge: 'Secondary', Icon: Instagram, color: '#7A8C9E' },
];

const THEMES = [
    'LinkedIn Thought Leadership',
    'Executive Insights',
    'Case Study Highlights',
    'Business Transformation',
    'Strategic Advisory',
];

// ── Variants ──────────────────────────────────────────────────────────────────

const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const fadeUp = {
    hidden:  { opacity: 0, y: 30, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
        transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] } },
};

// ── Workflow Step Card ────────────────────────────────────────────────────────

function StepCard({ Icon, label, number, index, inView }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.7, delay: 0.4 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex-1 min-w-0"
        >
            {/* Connector line — right side, except last */}
            {index < STEPS.length - 1 && (
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="hidden lg:block absolute top-[22px] left-[calc(50%+22px)] right-0 h-px origin-left z-0"
                    style={{ background: 'linear-gradient(to right, rgba(200,169,110,0.5), rgba(200,169,110,0.1))' }}
                />
            )}

            <div className="relative z-10 flex flex-col items-center text-center px-2">
                {/* Icon circle */}
                <div className="relative mb-4">
                    <div className="w-11 h-11 rounded-sm
                                    bg-white/[0.06] border border-white/10 backdrop-blur-sm
                                    flex items-center justify-center
                                    group-hover:bg-[#C8A96E]/15 group-hover:border-[#C8A96E]/40
                                    transition-all duration-400">
                        <Icon size={17} className="text-[#C8A96E] opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    {/* Ghost number */}
                    <span className="absolute -top-2 -right-3 text-[10px] font-bold text-[#C8A96E]/40 tracking-wider">
                        {number}
                    </span>
                </div>

                <p className="text-white/80 text-xs font-semibold leading-tight group-hover:text-white transition-colors duration-300">
                    {label}
                </p>
            </div>
        </motion.div>
    );
}

// ── Main Section ─────────────────────────────────────────────────────────────

export default function ContentEngineBlock() {
    const sectionRef  = useRef(null);
    const inView      = useInView(sectionRef, { once: true, margin: '-60px' });

    const handleCTA = () => {
        trackEvent('content_engine_cta_click');
        const el = document.querySelector('#consultation');
        if (el) {
            const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <section
            id="content-engine"
            className="relative overflow-hidden pb-28 md:pb-36"
            aria-labelledby="content-engine-title"
        >
            {/* ── Background image ── */}
            <div className="absolute inset-0" aria-hidden="true">
                <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2069&q=80"
                    alt=""
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                />
            </div>

            {/* ── Cinematic overlays ── */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute inset-0 bg-[#040C1C]/88" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#040C1C]/80 via-[#0B1F3A]/60 to-[#040C1C]/75" />
                <div
                    className="absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(3,8,20,0.6) 100%)' }}
                />
                {/* Film grain */}
                <div
                    className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '200px 200px',
                    }}
                />
            </div>

            {/* ── Dot grid ── */}
            <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                aria-hidden="true"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(200,169,110,0.4) 1px, transparent 1px)',
                    backgroundSize: '36px 36px',
                }}
            />

            {/* ── Ambient orbs ── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <motion.div
                    animate={{ scale: [1, 1.07, 1], opacity: [0.06, 0.12, 0.06] }}
                    transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
                    className="absolute -right-48 top-1/4 w-[600px] h-[600px] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(200,169,110,0.5) 0%, transparent 65%)' }}
                />
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.04, 0.08, 0.04] }}
                    transition={{ repeat: Infinity, duration: 11, ease: 'easeInOut', delay: 3 }}
                    className="absolute -left-40 bottom-0 w-[500px] h-[500px] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(200,169,110,0.4) 0%, transparent 65%)' }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-14 md:pt-16">
                <motion.div
                    ref={sectionRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >

                    {/* ── Header ── */}
                    <div className="max-w-3xl mb-14 md:mb-18">
                        <motion.div variants={fadeUp} className="mb-4">
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm
                                             bg-[#C8A96E]/10 border border-[#C8A96E]/25
                                             text-[#C8A96E] text-xs font-semibold tracking-[0.2em] uppercase backdrop-blur-sm">
                                <motion.span
                                    animate={{ opacity: [1, 0.25, 1] }}
                                    transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                                    className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]"
                                />
                                Thought Leadership
                            </span>
                        </motion.div>

                        <motion.h2
                            variants={fadeUp}
                            id="content-engine-title"
                            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-4"
                        >
                            <span className="text-white">Content &amp; </span>
                            <span className="text-[#C8A96E] drop-shadow-[0_0_24px_rgba(200,169,110,0.25)]">
                                Insights Engine
                            </span>
                        </motion.h2>

                        {/* Gold rule */}
                        <motion.div
                            variants={{
                                hidden:  { scaleX: 0, opacity: 0 },
                                visible: { scaleX: 1, opacity: 1,
                                    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
                            }}
                            style={{ originX: 0, background: 'linear-gradient(to right, #C8A96E, rgba(200,169,110,0.2), transparent)' }}
                            className="h-[2px] w-16 mb-5"
                        />

                        <motion.p variants={fadeUp} className="text-[#7A8C9E] text-base md:text-lg leading-relaxed font-light">
                            Revamp attracts and nurtures consulting leads through consistent executive
                            thought leadership — publishing strategic insights, case study highlights,
                            and business transformation commentary across key platforms.
                        </motion.p>
                    </div>

                    {/* ── Workflow pipeline ── */}
                    <motion.div variants={fadeUp} className="mb-14">
                        <p className="text-[#C8A96E] font-semibold text-xs mb-8 uppercase tracking-[0.22em]">
                            Content Workflow
                        </p>
                        <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-0">
                            {STEPS.map(({ Icon, label, number }, i) => (
                                <StepCard
                                    key={label}
                                    Icon={Icon}
                                    label={label}
                                    number={number}
                                    index={i}
                                    inView={inView}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Bottom two-column: platforms + themes ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

                        {/* Platforms */}
                        <motion.div variants={fadeUp}>
                            <p className="text-[#C8A96E] font-semibold text-xs mb-5 uppercase tracking-[0.22em]">
                                Publishing Platforms
                            </p>
                            <div className="flex flex-col gap-3">
                                {PLATFORMS.map(({ label, badge, Icon, color }, i) => (
                                    <motion.div
                                        key={label}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={inView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.6, delay: 0.6 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                        className="group flex items-center justify-between
                                                   px-5 py-3.5 rounded-sm
                                                   border border-white/[0.07] bg-white/[0.04] backdrop-blur-sm
                                                   hover:border-[#C8A96E]/35 hover:bg-white/[0.07]
                                                   transition-all duration-300 cursor-default"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-sm bg-white/[0.05] border border-white/10
                                                            flex items-center justify-center
                                                            group-hover:bg-[#C8A96E]/10 group-hover:border-[#C8A96E]/25
                                                            transition-all duration-300">
                                                <Icon size={13} style={{ color }} />
                                            </div>
                                            <span className="text-white/80 text-sm font-semibold group-hover:text-white transition-colors duration-300">
                                                {label}
                                            </span>
                                        </div>
                                        <span className={`text-[10px] font-semibold tracking-[0.15em] uppercase px-2 py-1 rounded-sm
                                            ${badge === 'Primary'
                                                ? 'bg-[#C8A96E]/15 text-[#C8A96E] border border-[#C8A96E]/20'
                                                : 'bg-white/[0.05] text-[#6A7D90] border border-white/[0.07]'}`}>
                                            {badge}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Themes + CTA */}
                        <motion.div variants={fadeUp} className="space-y-6">
                            <div>
                                <p className="text-[#C8A96E] font-semibold text-xs mb-5 uppercase tracking-[0.22em]">
                                    Content Themes
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {THEMES.map((theme, i) => (
                                        <motion.span
                                            key={theme}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                                            transition={{ duration: 0.4, delay: 0.7 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                                            className="px-3.5 py-1.5 rounded-sm
                                                       bg-white/[0.04] border border-white/[0.08]
                                                       text-[#8899AA] text-xs font-medium tracking-wide
                                                       hover:border-[#C8A96E]/30 hover:text-[#C8A96E] hover:bg-[#C8A96E]/[0.05]
                                                       transition-all duration-250 cursor-default"
                                        >
                                            {theme}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 1.1 }}
                                className="pt-2"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.04, y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={handleCTA}
                                    className="inline-flex items-center gap-2.5 bg-[#C8A96E] hover:bg-[#D4BC8A]
                                               text-[#0B1F3A] font-semibold text-sm px-6 py-3 rounded-sm
                                               transition-colors duration-200 cursor-pointer group"
                                    style={{ boxShadow: '0 8px 28px rgba(200,169,110,0.25)' }}
                                >
                                    Book a Consultation
                                    <motion.span
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                                        className="inline-flex"
                                    >
                                        <ArrowRight size={14} />
                                    </motion.span>
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}