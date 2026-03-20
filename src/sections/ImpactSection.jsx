import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedCounter from '../components/AnimatedCounter';

// ─── Enriched metrics with context ───────────────────────────────────────────
// Each metric now tells the story behind the number.

const METRICS = [
    {
        id:      'assets',
        value:   17000,
        prefix:  '',
        suffix:  '+',
        label:   'Assets Deployed',
        context: 'Leading Mobility Company',
        story:   'Built a full EV value chain — ride-hailing, charging, battery swapping, and mass transit — deploying 17,000+ units.',
        outcome: '17,000 units deployed.',
    },
    {
        id:      'roadmap',
        value:   500,
        prefix:  '₦',
        suffix:  'B',
        label:   'Growth Roadmap',
        context: 'Financial Services Group',
        story:   'Developed a 5-year group strategy to unify banking and asset management divisions.',
        outcome: '₦61B to ₦500B roadmap approved.',
    },
    {
        id:      'sales',
        value:   35,
        prefix:  '',
        suffix:  '%',
        label:   'Avg. Sales Growth',
        context: 'Interior Solutions Company',
        story:   'End-to-end sales transformation advisory, incentive redesign, and performance management overhaul.',
        outcome: '35% sales growth delivered.',
    },
    {
        id:      'industries',
        value:   12,
        prefix:  '',
        suffix:  '+',
        label:   'Industries Served',
        context: 'Cross-Sector Expertise',
        story:   'Finance, technology, infrastructure, insurance, FMCG, real estate, media, and more.',
        outcome: 'Deep bench across every major sector.',
    },
];

// ─── Client names from the pitch deck ────────────────────────────────────────

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
            className="group relative overflow-hidden rounded-sm cursor-default flex flex-col
                       border border-white/10
                       bg-white/[0.06] backdrop-blur-md
                       hover:bg-white/[0.11] hover:border-[#C8A96E]/40
                       hover:shadow-2xl hover:shadow-black/30 hover:-translate-y-2
                       transition-all duration-500"
        >
            {/* Top centre gold bar — widens on hover */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-[2px]
                            bg-gradient-to-r from-transparent via-[#C8A96E] to-transparent
                            opacity-60 group-hover:opacity-100 group-hover:w-28
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

            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.1) 0%, transparent 65%)' }}
            />

            <div className="relative p-7 md:p-8 flex flex-col h-full">

                {/* Client context tag */}
                <div className="flex items-center gap-2 mb-5">
                    <div className="w-1 h-1 rounded-full bg-[#C8A96E]/60 flex-shrink-0" />
                    <span className="text-[#C8A96E]/70 text-[10px] font-semibold tracking-[0.18em] uppercase">
                        {metric.context}
                    </span>
                </div>

                {/* Counter */}
                <div className="text-[2.8rem] md:text-[3.2rem] font-bold text-white mb-1 tracking-tight leading-none
                                drop-shadow-[0_0_20px_rgba(255,255,255,0.12)]
                                group-hover:drop-shadow-[0_0_28px_rgba(200,169,110,0.22)]
                                transition-all duration-500 text-center">
                    <AnimatedCounter
                        end={metric.value}
                        prefix={metric.prefix || ''}
                        suffix={metric.suffix}
                        duration={2200}
                    />
                </div>

                {/* Label */}
                <h3 className="text-[#C8A96E] font-semibold text-xs tracking-[0.2em] uppercase mb-4 text-center">
                    {metric.label}
                </h3>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-4 h-px origin-center"
                    style={{ background: 'linear-gradient(to right, transparent, rgba(200,169,110,0.35), transparent)' }}
                />

                {/* Story — the "for who / what happened" */}
                <p className="text-[#6A7D90] text-xs leading-relaxed font-light flex-1
                               group-hover:text-[#8A9CAE] transition-colors duration-300">
                    {metric.story}
                </p>

                {/* Outcome — bold result line anchored to bottom */}
                <div className="mt-4 pt-3 border-t border-white/[0.06] group-hover:border-[#C8A96E]/15 transition-colors duration-300">
                    <p className="text-white/70 text-xs font-semibold italic group-hover:text-[#C8A96E]/90 transition-colors duration-300">
                        {metric.outcome}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function ImpactSection() {
    const sectionRef    = useRef(null);
    const headerRef     = useRef(null);
    const headerInView  = useInView(headerRef,  { once: true, margin: '-60px' });
    const clientsRef    = useRef(null);
    const clientsInView = useInView(clientsRef, { once: true, margin: '-40px' });

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
    const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

    return (
        <section
            ref={sectionRef}
            id="impact"
            className="relative overflow-hidden py-28 md:py-36"
            aria-labelledby="impact-title"
        >
            {/* ── Background image ── */}
            <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110 will-change-transform" aria-hidden="true">
                <img
                    src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2070&q=80"
                    alt="" className="w-full h-full object-cover object-center"
                    loading="lazy" decoding="async"
                />
            </motion.div>

            {/* ── Cinematic overlays ── */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute inset-0 bg-[#040C1C]/85" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#040C1C]/70 via-[#0B1F3A]/55 to-[#040C1C]/80" />
                <div className="absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(3,8,20,0.65) 100%)' }} />
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat', backgroundSize: '200px 200px',
                    }}
                />
            </div>

            {/* Dot grid */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none" aria-hidden="true"
                style={{ backgroundImage: 'radial-gradient(circle, rgba(200,169,110,0.45) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
            />

            {/* Ambient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <motion.div animate={{ scale: [1, 1.07, 1], opacity: [0.08, 0.15, 0.08] }}
                    transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
                    className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full"
                    style={{ background: 'radial-gradient(ellipse, rgba(200,169,110,0.18) 0%, transparent 65%)' }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

                {/* ── Header ── */}
                <motion.div
                    ref={headerRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate={headerInView ? 'visible' : 'hidden'}
                    className="text-center mb-14 md:mb-16"
                >
                    <motion.div variants={fadeUpVariants} className="mb-5 flex justify-center">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm
                                         bg-[#C8A96E]/10 border border-[#C8A96E]/25
                                         text-[#C8A96E] text-xs font-semibold tracking-[0.2em] uppercase backdrop-blur-sm">
                            <motion.span animate={{ opacity: [1, 0.25, 1] }}
                                transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                                className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]"
                            />
                            Track Record
                        </span>
                    </motion.div>

                    <motion.h2 variants={fadeUpVariants} id="impact-title"
                        className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-4">
                        <span className="text-white">Proven Results, </span>
                        <span className="text-[#C8A96E] drop-shadow-[0_0_28px_rgba(200,169,110,0.3)]">Real Context</span>
                    </motion.h2>

                    <motion.div variants={{
                            hidden:  { scaleX: 0, opacity: 0 },
                            visible: { scaleX: 1, opacity: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
                        }}
                        className="mx-auto mb-5 h-[2px] w-16"
                        style={{ background: 'linear-gradient(to right, transparent, #C8A96E, transparent)' }}
                    />

                    <motion.p variants={fadeUpVariants}
                        className="text-[#8899AA] text-base md:text-lg leading-relaxed max-w-xl mx-auto font-light">
                        Numbers tell half the story. Here is what they mean — who we worked with,
                        what changed, and what it delivered.
                    </motion.p>
                </motion.div>

                {/* ── Metrics Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
                    {METRICS.map((metric, index) => (
                        <MetricCard key={metric.id} metric={metric} index={index} />
                    ))}
                </div>


                {/* ── Tagline ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-10 text-center"
                >
                    <p className="text-[#C8A96E]/60 text-sm italic font-light tracking-wide">
                        "Excellence is not a destination but a continuous journey that never ends." — Our guiding principle
                    </p>
                </motion.div>
            </div>
        </section>
    );
}