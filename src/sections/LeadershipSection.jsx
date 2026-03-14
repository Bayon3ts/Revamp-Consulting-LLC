import { motion, useInView } from 'framer-motion';
import { CheckCircle2, Linkedin, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const expertise = [
    'Corporate Strategy & Transformation',
    'Financial Planning & Analysis',
    'Infrastructure Development',
    'Technology & Digital Strategy',
    'Executive Leadership Development',
    'Project Governance & Delivery',
    'Business Development & Growth',
    'Cross-Sector Advisory',
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fadeUpVariants = {
    hidden:  { opacity: 0, y: 36, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
        transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function LeadershipSection() {
    const headerRef     = useRef(null);
    const headerInView  = useInView(headerRef,  { once: true, margin: '-60px' });
    const portraitRef   = useRef(null);
    const portraitInView = useInView(portraitRef, { once: true, margin: '-60px' });
    const bioRef        = useRef(null);
    const bioInView     = useInView(bioRef,     { once: true, margin: '-60px' });

    return (
        <section
            id="leadership"
            className="relative overflow-hidden bg-white pt-12 pb-28 md:pt-14 md:pb-36"
            aria-labelledby="leadership-title"
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
                {/* Gold orb top-right */}
                <div
                    className="absolute -right-48 -top-24 w-[560px] h-[560px] rounded-full opacity-[0.06]"
                    style={{ background: 'radial-gradient(circle, rgba(200,169,110,0.9) 0%, transparent 65%)' }}
                />
                {/* Navy orb bottom-left */}
                <div
                    className="absolute -left-40 bottom-0 w-[480px] h-[480px] rounded-full opacity-[0.04]"
                    style={{ background: 'radial-gradient(circle, rgba(11,31,58,0.9) 0%, transparent 65%)' }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

                {/* ── Section Header ── */}
                <motion.div
                    ref={headerRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate={headerInView ? 'visible' : 'hidden'}
                    className="mb-16 md:mb-20"
                >
                    <motion.div variants={fadeUpVariants} className="mb-4">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm
                                         bg-[#C8A96E]/10 border border-[#C8A96E]/25
                                         text-[#C8A96E] text-xs font-semibold tracking-[0.2em] uppercase">
                            <motion.span
                                animate={{ opacity: [1, 0.25, 1] }}
                                transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                                className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]"
                            />
                            Leadership
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={fadeUpVariants}
                        id="leadership-title"
                        className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-4"
                    >
                        <span className="text-[#0B1F3A]">Guided by </span>
                        <span className="text-[#C8A96E]">Seasoned Expertise</span>
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
                </motion.div>

                {/* ── Two-column layout ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

                    {/* ── Portrait Column ── */}
                    <motion.div
                        ref={portraitRef}
                        initial={{ opacity: 0, x: -48, filter: 'blur(10px)' }}
                        animate={portraitInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
                        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
        {/* Portrait card */}
                        <div className="relative bg-gradient-to-br from-[#0B1F3A] via-[#0D2240] to-[#091628] rounded-sm overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0 shadow-2xl shadow-[#0B1F3A]/40">

                            {/* Real photo */}
                            <img
                                src="/portrait.jpg"
                                alt="Adekunle Olusanya - Founder & Principal Consultant"
                                className="absolute inset-0 w-full h-full object-cover object-center"
                            />

                            {/* Cinematic colour grade over photo */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/85 via-[#0B1F3A]/10 to-transparent" />
                            {/* Subtle gold tone wash */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#C8A96E]/08" />

                            {/* Bottom info bar — glassmorphism */}
                            <div className="absolute bottom-0 left-0 right-0 bg-[#0B1F3A]/80 backdrop-blur-md border-t border-[#C8A96E]/15 px-6 py-5">
                                <p className="text-white font-bold text-lg tracking-tight">Adekunle Olusanya</p>
                                <p className="text-[#C8A96E] text-[10px] tracking-[0.22em] uppercase font-semibold mt-0.5">
                                    Founder & Principal Consultant
                                </p>
                            </div>
                        </div>

                        {/* Experience badge — animated */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                            animate={portraitInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                            transition={{ delay: 0.8, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute -bottom-5 -right-3 lg:-right-5 z-20"
                        >
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                                className="relative bg-[#C8A96E] text-[#0B1F3A] rounded-sm p-5
                                           shadow-2xl shadow-[#C8A96E]/35 overflow-hidden"
                            >
                                {/* Shimmer sweep */}
                                <motion.div
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '200%' }}
                                    transition={{ repeat: Infinity, duration: 2.5, delay: 1.2, ease: 'easeInOut', repeatDelay: 3 }}
                                    className="absolute inset-y-0 w-1/2 pointer-events-none"
                                    style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)' }}
                                />
                                <motion.p
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={portraitInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 1.1, duration: 0.5 }}
                                    className="text-3xl font-bold leading-none"
                                >
                                    20+
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={portraitInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 1.25, duration: 0.5 }}
                                    className="text-[10px] font-bold leading-tight mt-1 uppercase tracking-wider"
                                >
                                    Years of<br />Experience
                                </motion.p>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* ── Bio Column ── */}
                    <motion.div
                        ref={bioRef}
                        variants={containerVariants}
                        initial="hidden"
                        animate={bioInView ? 'visible' : 'hidden'}
                    >
                        {/* Role label */}
                        <motion.div variants={fadeUpVariants} className="mb-2">
                            <span className="text-[#C8A96E] text-xs font-semibold tracking-[0.22em] uppercase">
                                Founder / Principal Consultant
                            </span>
                        </motion.div>

                        {/* Name */}
                        <motion.h3
                            variants={fadeUpVariants}
                            className="text-[#0B1F3A] text-3xl md:text-4xl font-bold mb-2 tracking-tight"
                        >
                            Adekunle Olusanya
                        </motion.h3>

                        {/* Gold rule */}
                        <motion.div
                            variants={{
                                hidden:  { scaleX: 0, opacity: 0 },
                                visible: { scaleX: 1, opacity: 1,
                                    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
                            }}
                            style={{ originX: 0, background: 'linear-gradient(to right, #C8A96E, rgba(200,169,110,0.15), transparent)' }}
                            className="h-[2px] w-12 mb-6"
                        />

                        {/* Bio paragraphs */}
                        <motion.div variants={fadeUpVariants} className="space-y-4 text-[#6A7D90] text-base leading-relaxed mb-8 font-light">
                            <p>
                                Adekunle Olusanya is a seasoned executive consultant with over 20 years of cross-sector experience spanning strategy, finance, infrastructure, and technology. He has advised organizations across multiple industries, helping them navigate complexity and deliver transformative outcomes.
                            </p>
                            <p>
                                As the founder of Revamp Consulting LLC, Adekunle brings a practitioner's perspective to every engagement — combining deep analytical rigor with hands-on implementation expertise. His work has contributed to the deployment of significant strategic assets and measurable business performance improvements for clients ranging from startups to large corporates.
                            </p>
                            <p>
                                His approach is grounded in clarity, accountability, and a relentless focus on results that create lasting value.
                            </p>
                        </motion.div>

                        {/* Expertise grid */}
                        <motion.div variants={fadeUpVariants}>
                            <p className="text-[#0B1F3A] font-semibold text-xs mb-4 uppercase tracking-[0.18em]">
                                Areas of Expertise
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4">
                                {expertise.map((item, i) => (
                                    <motion.div
                                        key={item}
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={bioInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.5, delay: 0.5 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                                        className="flex items-start gap-2.5 group"
                                    >
                                        <CheckCircle2
                                            size={14}
                                            className="text-[#C8A96E] mt-0.5 flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
                                        />
                                        <span className="text-[#6A7D90] text-sm group-hover:text-[#0B1F3A] transition-colors duration-200">
                                            {item}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* LinkedIn CTA */}
                        <motion.div variants={fadeUpVariants} className="mt-8">
                            <motion.a
                                href="https://www.linkedin.com/in/adekunle-olusanya"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-2.5 text-[#0B1F3A] font-semibold text-sm
                                           border border-[#0B1F3A]/15 px-5 py-3 rounded-sm
                                           hover:border-[#C8A96E]/50 hover:text-[#C8A96E]
                                           hover:shadow-md hover:shadow-[#C8A96E]/10
                                           transition-all duration-300 group"
                            >
                                <Linkedin size={15} />
                                Connect on LinkedIn
                                <ArrowUpRight size={13} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                            </motion.a>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}