import { motion, useInView } from 'framer-motion';
import {
    Lightbulb, BarChart3, Rocket, ClipboardList,
    TrendingUp, Code2, GraduationCap, Settings2
} from 'lucide-react';
import { useRef } from 'react';
import { services } from '../data/services';

// ─── Icon map ─────────────────────────────────────────────────────────────────

const iconMap = {
    Lightbulb, BarChart3, Rocket, ClipboardList,
    TrendingUp, Code2, GraduationCap, Settings2,
};

// Per-card icon accent colours cycling through brand palette
const iconAccents = [
    { bg: 'bg-[#0B1F3A]',       icon: 'text-[#C8A96E]',  hover: 'group-hover:bg-[#C8A96E] group-hover:text-[#0B1F3A]' },
    { bg: 'bg-[#C8A96E]/15',    icon: 'text-[#C8A96E]',  hover: 'group-hover:bg-[#C8A96E] group-hover:text-white' },
    { bg: 'bg-[#1A4A6E]/10',    icon: 'text-[#1A4A6E]',  hover: 'group-hover:bg-[#1A4A6E] group-hover:text-white' },
    { bg: 'bg-[#0B1F3A]/[0.07]',icon: 'text-[#0B1F3A]',  hover: 'group-hover:bg-[#0B1F3A] group-hover:text-[#C8A96E]' },
    { bg: 'bg-[#C8A96E]/12',    icon: 'text-[#8B6914]',  hover: 'group-hover:bg-[#8B6914] group-hover:text-white' },
    { bg: 'bg-[#1A4A6E]/10',    icon: 'text-[#1A4A6E]',  hover: 'group-hover:bg-[#C8A96E] group-hover:text-[#0B1F3A]' },
    { bg: 'bg-[#0B1F3A]',       icon: 'text-[#C8A96E]',  hover: 'group-hover:bg-[#C8A96E] group-hover:text-[#0B1F3A]' },
    { bg: 'bg-[#C8A96E]/15',    icon: 'text-[#8B6914]',  hover: 'group-hover:bg-[#0B1F3A] group-hover:text-[#C8A96E]' },
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUpVariants = {
    hidden:  { opacity: 0, y: 36, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({ service, index }) {
    const ref    = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const Icon   = iconMap[service.icon];
    const accent = iconAccents[index % iconAccents.length];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 44, filter: 'blur(8px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.75, delay: (index % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-sm p-7 cursor-default
                       border border-[#0B1F3A]/[0.08]
                       bg-white/50 backdrop-blur-md
                       shadow-sm shadow-[#0B1F3A]/[0.04]
                       hover:border-[#C8A96E]/40 hover:bg-white/70
                       hover:shadow-xl hover:shadow-[#0B1F3A]/[0.08] hover:-translate-y-1
                       transition-all duration-500"
        >
            {/* Top accent line on hover */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ background: 'linear-gradient(to right, #C8A96E, rgba(200,169,110,0.2), transparent)' }}
            />

            {/* Corner bracket */}
            <div className="absolute top-0 left-0 w-8 h-8 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-px h-5 bg-gradient-to-b from-[#C8A96E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 h-px w-5 bg-gradient-to-r from-[#C8A96E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 20% 10%, rgba(200,169,110,0.07) 0%, transparent 65%)' }}
            />

            {/* Ghost number */}
            <span className="absolute top-5 right-5 text-[2.6rem] font-bold leading-none select-none tracking-tight
                             text-[#0B1F3A]/[0.05] group-hover:text-[#C8A96E]/15 transition-colors duration-500">
                {String(index + 1).padStart(2, '0')}
            </span>

            {/* Icon box */}
            <div className={`relative w-11 h-11 rounded-sm flex items-center justify-center mb-5
                             border border-transparent transition-all duration-300
                             ${accent.bg} ${accent.hover}`}>
                {Icon && (
                    <Icon size={19} className={`transition-colors duration-300 ${accent.icon} group-hover:text-inherit`} />
                )}
            </div>

            <h3 className="text-[#0B1F3A] font-semibold text-base mb-2.5 leading-snug
                           group-hover:text-[#0B1F3A] transition-colors duration-300">
                {service.title}
            </h3>
            <p className="text-[#6A7D90] text-sm leading-relaxed font-light">
                {service.description}
            </p>
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
            {/* ── Subtle background ── */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(11,31,58,0.8) 1px, transparent 1px)',
                        backgroundSize: '36px 36px',
                    }}
                />
                <div
                    className="absolute -right-56 top-0 w-[600px] h-[600px] rounded-full opacity-[0.05]"
                    style={{ background: 'radial-gradient(circle, rgba(200,169,110,0.8) 0%, transparent 65%)' }}
                />
                <div
                    className="absolute -left-40 bottom-0 w-[500px] h-[500px] rounded-full opacity-[0.04]"
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
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-16"
                >
                    <div className="max-w-xl">
                        {/* Eyebrow */}
                        <motion.div variants={fadeUpVariants} className="mb-4">
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm
                                             bg-[#C8A96E]/10 border border-[#C8A96E]/25
                                             text-[#C8A96E] text-xs font-semibold tracking-[0.2em] uppercase">
                                <motion.span
                                    animate={{ opacity: [1, 0.25, 1] }}
                                    transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                                    className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]"
                                />
                                Our Services
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h2
                            variants={fadeUpVariants}
                            id="services-title"
                            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-4"
                        >
                            <span className="text-[#0B1F3A]">Expert Consulting</span>
                            <br />
                            <span className="text-[#C8A96E]">Across Every Dimension</span>
                            <br />
                            <span className="text-[#0B1F3A]">of Your Business</span>
                        </motion.h2>

                        {/* Gold rule */}
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

                    {/* Right descriptor */}
                    <motion.p
                        variants={fadeUpVariants}
                        className="text-[#7A8C9E] text-sm md:text-base leading-relaxed max-w-sm md:text-right font-light"
                    >
                        From strategic advisory to hands-on delivery, we bring the expertise
                        your organization needs at every stage.
                    </motion.p>
                </motion.div>

                {/* ── Services Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {services.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}