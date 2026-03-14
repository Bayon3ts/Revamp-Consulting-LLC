import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedCounter from '../components/AnimatedCounter';
import { metrics } from '../data/content';

// ─── Variants ─────────────────────────────────────────────────────────────────

const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const fadeUpVariants = {
    hidden:  { opacity: 0, y: 38, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
        transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Metric Card ──────────────────────────────────────────────────────────────

function MetricCard({ metric, index }) {
    const ref    = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 52, filter: 'blur(10px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.85, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-sm text-center cursor-default
                       border border-white/10
                       bg-white/[0.06] backdrop-blur-md
                       hover:bg-white/[0.11] hover:border-[#C8A96E]/40
                       hover:shadow-2xl hover:shadow-black/30 hover:-translate-y-2
                       transition-all duration-500"
        >
            {/* Top centre gold bar */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-[2px]
                            bg-gradient-to-r from-transparent via-[#C8A96E] to-transparent
                            opacity-60 group-hover:opacity-100 group-hover:w-24
                            transition-all duration-500" />

            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-7 h-7 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-px h-5 bg-gradient-to-b from-[#C8A96E]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 h-px w-5 bg-gradient-to-r from-[#C8A96E]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="absolute top-0 right-0 w-7 h-7 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-px h-5 bg-gradient-to-b from-[#C8A96E]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 h-px w-5 bg-gradient-to-l from-[#C8A96E]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Hover inner glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.1) 0%, transparent 65%)' }}
            />

            <div className="relative p-8 md:p-10">
                {/* Counter */}
                <div className="text-[3rem] md:text-[3.5rem] font-bold text-white mb-3 tracking-tight leading-none
                                drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]
                                group-hover:drop-shadow-[0_0_28px_rgba(200,169,110,0.25)]
                                transition-all duration-500">
                    <AnimatedCounter
                        end={metric.value}
                        prefix={metric.prefix || ''}
                        suffix={metric.suffix}
                        duration={2200}
                    />
                </div>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto mb-3 h-px w-10 origin-center"
                    style={{ background: 'linear-gradient(to right, transparent, rgba(200,169,110,0.6), transparent)' }}
                />

                <h3 className="text-[#C8A96E] font-semibold text-xs tracking-[0.2em] uppercase mb-2">
                    {metric.label}
                </h3>
                <p className="text-[#7A8C9E] text-xs leading-relaxed font-light group-hover:text-[#8A9CAE] transition-colors duration-300">
                    {metric.description}
                </p>
            </div>
        </motion.div>
    );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function ImpactSection() {
    const sectionRef   = useRef(null);
    const headerRef    = useRef(null);
    const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
    const taglineRef   = useRef(null);
    const taglineInView = useInView(taglineRef, { once: true, margin: '-40px' });

    // Subtle parallax on bg
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
    const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

    return (
        <section
            ref={sectionRef}
            id="impact"
            className="relative overflow-hidden py-28 md:py-36"
            aria-labelledby="impact-title"
        >
            {/* ── Background image with parallax ── */}
            <motion.div
                style={{ y: bgY }}
                className="absolute inset-0 scale-110 will-change-transform"
                aria-hidden="true"
            >
                <img
                    src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2070&q=80"
                    alt=""
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                />
            </motion.div>

            {/* ── Cinematic overlays ── */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {/* Deep navy base */}
                <div className="absolute inset-0 bg-[#040C1C]/85" />
                {/* Directional grade */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#040C1C]/70 via-[#0B1F3A]/55 to-[#040C1C]/80" />
                {/* Radial vignette */}
                <div
                    className="absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(3,8,20,0.65) 100%)' }}
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
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                aria-hidden="true"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(200,169,110,0.45) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                }}
            />

            {/* ── Ambient orbs ── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <motion.div
                    animate={{ scale: [1, 1.07, 1], opacity: [0.08, 0.15, 0.08] }}
                    transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
                    className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full"
                    style={{ background: 'radial-gradient(ellipse, rgba(200,169,110,0.18) 0%, transparent 65%)' }}
                />
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
                    transition={{ repeat: Infinity, duration: 11, ease: 'easeInOut', delay: 3 }}
                    className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full"
                    style={{ background: 'radial-gradient(ellipse, rgba(200,169,110,0.12) 0%, transparent 65%)' }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

                {/* ── Header ── */}
                <motion.div
                    ref={headerRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate={headerInView ? 'visible' : 'hidden'}
                    className="text-center mb-16 md:mb-20"
                >
                    {/* Eyebrow */}
                    <motion.div variants={fadeUpVariants} className="mb-5 flex justify-center">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm
                                         bg-[#C8A96E]/10 border border-[#C8A96E]/25
                                         text-[#C8A96E] text-xs font-semibold tracking-[0.2em] uppercase backdrop-blur-sm">
                            <motion.span
                                animate={{ opacity: [1, 0.25, 1] }}
                                transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                                className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]"
                            />
                            Track Record
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h2
                        variants={fadeUpVariants}
                        id="impact-title"
                        className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-4"
                    >
                        <span className="text-white">Proven Results,{' '}</span>
                        <span className="text-[#C8A96E] drop-shadow-[0_0_28px_rgba(200,169,110,0.3)]">
                            Measurable Impact
                        </span>
                    </motion.h2>

                    {/* Gold rule */}
                    <motion.div
                        variants={{
                            hidden:  { scaleX: 0, opacity: 0 },
                            visible: { scaleX: 1, opacity: 1,
                                transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
                        }}
                        className="mx-auto mb-5 h-[2px] w-16"
                        style={{ background: 'linear-gradient(to right, transparent, #C8A96E, transparent)' }}
                    />

                    <motion.p
                        variants={fadeUpVariants}
                        className="text-[#8899AA] text-base md:text-lg leading-relaxed max-w-xl mx-auto font-light"
                    >
                        Our engagements are measured by results. Here is a snapshot of the
                        impact we have delivered for our clients.
                    </motion.p>
                </motion.div>

                {/* ── Metrics Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {metrics.map((metric, index) => (
                        <MetricCard key={metric.id} metric={metric} index={index} />
                    ))}
                </div>

                {/* ── Tagline ── */}
                <motion.div
                    ref={taglineRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={taglineInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-16 text-center"
                >
                    <p className="text-[#C8A96E]/70 text-sm italic font-light tracking-wide">
                        "Excellence is not a destination but a continuous journey that never ends." — Our guiding principle
                    </p>
                </motion.div>
            </div>
        </section>
    );
}