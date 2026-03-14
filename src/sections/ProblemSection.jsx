import { motion, useInView } from 'framer-motion';
import { TrendingDown, AlertOctagon, Compass, Target, ArrowRight } from 'lucide-react';
import { useRef } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const painPoints = [
    {
        id:          'growth',
        Icon:        TrendingDown,
        title:       'Growth Stagnation',
        description: 'Revenue plateaus, market share erosion, and the inability to identify and capitalize on new growth vectors.',
        number:      '01',
        iconBg:      'bg-[#0B1F3A]/[0.08] border-[#0B1F3A]/15 group-hover:bg-[#0B1F3A]/14 group-hover:border-[#0B1F3A]/30',
        iconColor:   'text-[#0B1F3A]',
    },
    {
        id:          'operations',
        Icon:        AlertOctagon,
        title:       'Operational Inefficiencies',
        description: 'Bloated processes, misaligned teams, and execution gaps that drain resources and slow organizational momentum.',
        number:      '02',
        iconBg:      'bg-[#C8A96E]/12 border-[#C8A96E]/25 group-hover:bg-[#C8A96E]/20 group-hover:border-[#C8A96E]/45',
        iconColor:   'text-[#C8A96E]',
    },
    {
        id:          'strategy',
        Icon:        Compass,
        title:       'Strategic Ambiguity',
        description: 'Unclear direction, conflicting priorities, and leadership misalignment that paralyze decision-making.',
        number:      '03',
        iconBg:      'bg-[#1A4A6E]/[0.09] border-[#1A4A6E]/18 group-hover:bg-[#1A4A6E]/16 group-hover:border-[#1A4A6E]/35',
        iconColor:   'text-[#1A4A6E]',
    },
    {
        id:          'execution',
        Icon:        Target,
        title:       'Execution Gaps',
        description: 'Well-designed plans that fail at implementation due to inadequate governance, accountability, and execution structure.',
        number:      '04',
        iconBg:      'bg-[#8B6914]/[0.09] border-[#8B6914]/18 group-hover:bg-[#8B6914]/16 group-hover:border-[#8B6914]/35',
        iconColor:   'text-[#8B6914]',
    },
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const containerVariants = {
    hidden:   {},
    visible:  { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const fadeUpVariants = {
    hidden:  { opacity: 0, y: 40, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Animated hook ────────────────────────────────────────────────────────────

function useAnimatedSection() {
    const ref    = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    return { ref, inView };
}

// ─── Pain Point Card ──────────────────────────────────────────────────────────

function PainCard({ point, index }) {
    const { ref, inView } = useAnimatedSection();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 48, filter: 'blur(8px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-sm p-8 cursor-default
                       border border-[#0B1F3A]/10
                       bg-white/40 backdrop-blur-md
                       shadow-sm shadow-[#0B1F3A]/[0.06]
                       hover:border-[#C8A96E]/45 hover:bg-white/55
                       hover:shadow-xl hover:shadow-[#0B1F3A]/[0.08] hover:-translate-y-1
                       transition-all duration-500"
        >
            {/* Corner accent — gold L-bracket on hover */}
            <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-px h-6 bg-gradient-to-b from-[#C8A96E] to-transparent
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 h-px w-6 bg-gradient-to-r from-[#C8A96E] to-transparent
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Hover warm glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 20% 20%, rgba(200,169,110,0.09) 0%, transparent 65%)' }}
            />

            {/* Ghost number */}
            <span className="absolute top-5 right-6 text-[3rem] font-bold leading-none select-none tracking-tight
                             text-[#0B1F3A]/[0.06] group-hover:text-[#C8A96E]/20 transition-colors duration-500">
                {point.number}
            </span>

            {/* Icon */}
            <div className={`relative mb-5 w-12 h-12 rounded-sm flex items-center justify-center border transition-all duration-400 ${point.iconBg}`}>
                <point.Icon
                    size={20}
                    className={`${point.iconColor} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}
                />
            </div>

            <h3 className="text-[#0B1F3A] font-semibold text-lg mb-3 tracking-tight
                           group-hover:text-[#0B1F3A] transition-colors duration-300">
                {point.title}
            </h3>
            <p className="text-[#5A6E82] text-sm leading-relaxed font-light group-hover:text-[#4A5E72] transition-colors duration-300">
                {point.description}
            </p>
        </motion.div>
    );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function ProblemSection() {
    const headerRef    = useRef(null);
    const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
    const bannerRef    = useRef(null);
    const bannerInView = useInView(bannerRef, { once: true, margin: '-60px' });

    const handleScroll = (href) => {
        const el = document.querySelector(href);
        if (el) {
            const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <section
            id="problem"
            className="relative overflow-hidden bg-white py-28 md:py-36"
            aria-labelledby="problem-title"
        >
            {/* ── Subtle background details ── */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {/* Very faint navy dot grid */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(11,31,58,0.8) 1px, transparent 1px)',
                        backgroundSize: '36px 36px',
                    }}
                />
                {/* Soft gold ambient orb — top right */}
                <div
                    className="absolute -right-48 -top-32 w-[560px] h-[560px] rounded-full opacity-[0.06]"
                    style={{ background: 'radial-gradient(circle, rgba(200,169,110,0.8) 0%, transparent 65%)' }}
                />
                {/* Soft navy orb — bottom left */}
                <div
                    className="absolute -left-40 bottom-0 w-[480px] h-[480px] rounded-full opacity-[0.04]"
                    style={{ background: 'radial-gradient(circle, rgba(11,31,58,0.8) 0%, transparent 65%)' }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

                {/* ── Header ── */}
                <motion.div
                    ref={headerRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate={headerInView ? 'visible' : 'hidden'}
                    className="max-w-3xl mb-16 md:mb-20"
                >
                    {/* Eyebrow badge */}
                    <motion.div variants={fadeUpVariants} className="mb-5">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm
                                         bg-[#C8A96E]/10 border border-[#C8A96E]/25
                                         text-[#C8A96E] text-xs font-semibold tracking-[0.2em] uppercase">
                            <motion.span
                                animate={{ opacity: [1, 0.25, 1] }}
                                transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                                className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]"
                            />
                            The Challenge
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h2
                        variants={fadeUpVariants}
                        id="problem-title"
                        className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-5"
                    >
                        <span className="text-[#0B1F3A]">Complex Business Challenges</span>
                        <br />
                        <span className="text-[#C8A96E]">Require Clear Strategy</span>
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

                    <motion.p
                        variants={fadeUpVariants}
                        className="text-[#7A8C9E] text-base md:text-lg leading-relaxed font-light max-w-2xl"
                    >
                        Most organizations don't fail for lack of talent or ambition. They fail because
                        strategy is unclear, execution is misaligned, and the right guidance arrives too late.
                    </motion.p>
                </motion.div>

                {/* ── Pain Points Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16 md:mb-20">
                    {painPoints.map((point, i) => (
                        <PainCard key={point.id} point={point} index={i} />
                    ))}
                </div>

                {/* ── Promise Banner — stays dark for contrast ── */}
                <motion.div
                    ref={bannerRef}
                    initial={{ opacity: 0, y: 44, filter: 'blur(6px)' }}
                    animate={bannerInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden rounded-sm border border-[#C8A96E]/18
                               bg-[#0B1F3A]
                               px-8 md:px-12 py-10 md:py-12
                               flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
                >
                    {/* Dot texture */}
                    <div
                        className="absolute inset-0 opacity-[0.08] pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(circle, rgba(200,169,110,0.35) 1px, transparent 1px)',
                            backgroundSize: '24px 24px',
                        }}
                    />
                    {/* Left gold bar */}
                    <div
                        className="absolute left-0 inset-y-0 w-[3px] pointer-events-none"
                        style={{ background: 'linear-gradient(to bottom, transparent, rgba(200,169,110,0.7), transparent)' }}
                    />
                    {/* Ambient glow */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(200,169,110,0.07) 0%, transparent 60%)' }}
                    />

                    <div className="relative max-w-xl">
                        <p className="text-[#C8A96E] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                            Our Promise
                        </p>
                        <h3 className="text-white text-2xl md:text-3xl font-bold leading-snug tracking-tight">
                            We move organizations from{' '}
                            <span className="text-[#C8A96E]">uncertainty</span>{' '}
                            to structured, confident execution.
                        </h3>
                    </div>

                    <div className="relative flex-shrink-0">
                        <motion.button
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleScroll('#services')}
                            className="inline-flex items-center gap-2.5 bg-[#C8A96E] hover:bg-[#D4BC8A]
                                       text-[#0B1F3A] font-semibold text-sm px-7 py-3.5 rounded-sm
                                       transition-colors duration-200 cursor-pointer"
                            style={{ boxShadow: '0 8px 28px rgba(200,169,110,0.28)' }}
                        >
                            See How We Help
                            <motion.span
                                animate={{ x: [0, 4, 0] }}
                                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                                className="inline-flex"
                            >
                                <ArrowRight size={15} />
                            </motion.span>
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}