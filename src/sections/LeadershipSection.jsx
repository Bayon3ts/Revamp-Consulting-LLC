import { motion, useInView } from 'framer-motion';
import { Linkedin, ArrowUpRight, Award, Globe, TrendingUp, Users } from 'lucide-react';
import { useRef } from 'react';

// ─── Credibility stats ────────────────────────────────────────────────────────

const CREDIBILITY = [
    { value: '20+', label: 'Years Executive Leadership',  Icon: Award  },
    { value: '12+', label: 'Industries Served',           Icon: Globe  },
    { value: '₦500B', label: 'Strategic Roadmap Delivered', Icon: TrendingUp },
    { value: '1,500+', label: 'Talents Developed',        Icon: Users  },
];

// ─── Expertise tags ───────────────────────────────────────────────────────────

const EXPERTISE = [
    'Corporate Strategy & Transformation',
    'Financial Planning & Analysis',
    'Infrastructure Deployment ($1B+)',
    'Technology & Digital Strategy',
    'Executive Leadership Development',
    'Project Governance & Delivery',
    'Business Development & Growth',
    'Cross-Sector Advisory',
];

// ─── Career highlights — pulled from the pitch deck ──────────────────────────

const CAREER = [
    { year: '2011–13', role: 'Network Engineer',     org: 'Huawei',        note: 'Site optimization' },
    { year: '2013–18', role: 'Project Consultant',   org: 'Ericsson',      note: '$1B+ deployment' },
    { year: '2018–20', role: 'Deployment Manager',   org: 'Airtel',        note: '$50M portfolio' },
    { year: '2021–23', role: 'Head of Operations',   org: 'SourceIN BPO',  note: '1,500+ talents' },
    { year: '2023–24', role: 'Head Key Accounts',    org: 'Centdoor',      note: '$35M revenue' },
    { year: '2025–',   role: 'Head of Operations',   org: 'QORAY Mobility', note: '17,000 EVs' },
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUpVariants = {
    hidden:  { opacity: 0, y: 36, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
        transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function LeadershipSection() {
    const headerRef      = useRef(null);
    const headerInView   = useInView(headerRef,   { once: true, margin: '-60px' });
    const portraitRef    = useRef(null);
    const portraitInView = useInView(portraitRef, { once: true, margin: '-60px' });
    const bioRef         = useRef(null);
    const bioInView      = useInView(bioRef,      { once: true, margin: '-60px' });
    const careerRef      = useRef(null);
    const careerInView   = useInView(careerRef,   { once: true, margin: '-60px' });

    return (
        <section
            id="leadership"
            className="relative overflow-hidden bg-white pt-12 pb-28 md:pt-14 md:pb-36"
            aria-labelledby="leadership-title"
        >
            {/* ── Background ── */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute inset-0 opacity-[0.022]"
                    style={{ backgroundImage: 'radial-gradient(circle, rgba(11,31,58,0.8) 1px, transparent 1px)', backgroundSize: '36px 36px' }}
                />
                <div className="absolute -right-48 -top-24 w-[560px] h-[560px] rounded-full opacity-[0.06]"
                    style={{ background: 'radial-gradient(circle, rgba(200,169,110,0.9) 0%, transparent 65%)' }} />
                <div className="absolute -left-40 bottom-0 w-[480px] h-[480px] rounded-full opacity-[0.04]"
                    style={{ background: 'radial-gradient(circle, rgba(11,31,58,0.9) 0%, transparent 65%)' }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

                {/* ── Header ── */}
                <motion.div ref={headerRef} variants={containerVariants} initial="hidden"
                    animate={headerInView ? 'visible' : 'hidden'} className="mb-14 md:mb-16">
                    <motion.div variants={fadeUpVariants} className="mb-4">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm
                                         bg-[#C8A96E]/10 border border-[#C8A96E]/25
                                         text-[#C8A96E] text-xs font-semibold tracking-[0.2em] uppercase">
                            <motion.span animate={{ opacity: [1, 0.25, 1] }}
                                transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                                className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]" />
                            Leadership
                        </span>
                    </motion.div>
                    <motion.h2 variants={fadeUpVariants} id="leadership-title"
                        className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-4">
                        <span className="text-[#0B1F3A]">Guided by </span>
                        <span className="text-[#C8A96E]">Seasoned Expertise</span>
                    </motion.h2>
                    <motion.div variants={{
                            hidden:  { scaleX: 0, opacity: 0 },
                            visible: { scaleX: 1, opacity: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
                        }}
                        style={{ originX: 0, background: 'linear-gradient(to right, #C8A96E, rgba(200,169,110,0.2), transparent)' }}
                        className="h-[2px] w-16"
                    />
                </motion.div>

                {/* ── Two-column ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

                    {/* ── Portrait Column ── */}
                    <motion.div ref={portraitRef}
                        initial={{ opacity: 0, x: -48, filter: 'blur(10px)' }}
                        animate={portraitInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
                        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        {/* Portrait card */}
                        <div className="relative bg-gradient-to-br from-[#0B1F3A] via-[#0D2240] to-[#091628] rounded-sm overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0 shadow-2xl shadow-[#0B1F3A]/40">
                            <img src="/portrait.jpg" alt="Adekunle Olusanya — Founder & Principal Consultant"
                                className="absolute inset-0 w-full h-full object-cover object-center" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/85 via-[#0B1F3A]/10 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#C8A96E]/[0.06]" />
                            <div className="absolute bottom-0 left-0 right-0 bg-[#0B1F3A]/80 backdrop-blur-md border-t border-[#C8A96E]/15 px-6 py-5">
                                <p className="text-white font-bold text-lg tracking-tight">Adekunle Olusanya</p>
                                <p className="text-[#C8A96E] text-[10px] tracking-[0.22em] uppercase font-semibold mt-0.5">
                                    Founder & Principal Consultant
                                </p>
                            </div>
                        </div>

                        {/* Experience badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                            animate={portraitInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                            transition={{ delay: 0.8, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute -bottom-5 -right-3 lg:-right-5 z-20"
                        >
                            <motion.div animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                                className="relative bg-[#C8A96E] text-[#0B1F3A] rounded-sm p-5 shadow-2xl shadow-[#C8A96E]/35 overflow-hidden">
                                <motion.div
                                    initial={{ x: '-100%' }} animate={{ x: '200%' }}
                                    transition={{ repeat: Infinity, duration: 2.5, delay: 1.2, ease: 'easeInOut', repeatDelay: 3 }}
                                    className="absolute inset-y-0 w-1/2 pointer-events-none"
                                    style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)' }}
                                />
                                <p className="text-3xl font-bold leading-none">20+</p>
                                <p className="text-[10px] font-bold leading-tight mt-1 uppercase tracking-wider">Years of<br />Experience</p>
                            </motion.div>
                        </motion.div>

                        {/* ── Credibility stats below portrait ── */}
                        <div className="mt-10 grid grid-cols-2 gap-3 max-w-sm mx-auto lg:mx-0">
                            {CREDIBILITY.map(({ value, label, Icon }, i) => (
                                <motion.div
                                    key={label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={portraitInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 1.0 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className="group flex items-start gap-3 p-3.5 rounded-sm
                                               border border-[#0B1F3A]/[0.07] bg-white/60 backdrop-blur-sm
                                               hover:border-[#C8A96E]/35 hover:bg-white/80
                                               transition-all duration-300"
                                >
                                    <div className="w-7 h-7 rounded-sm bg-[#0B1F3A]/[0.05] flex items-center justify-center flex-shrink-0
                                                    group-hover:bg-[#C8A96E]/12 transition-colors duration-300">
                                        <Icon size={13} className="text-[#C8A96E]" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[#0B1F3A] font-bold text-sm leading-none">{value}</p>
                                        <p className="text-[#7A8C9E] text-[10px] leading-tight mt-0.5 font-light">{label}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Bio Column ── */}
                    <motion.div ref={bioRef} variants={containerVariants} initial="hidden"
                        animate={bioInView ? 'visible' : 'hidden'}>

                        {/* Role + name */}
                        <motion.div variants={fadeUpVariants} className="mb-2">
                            <span className="text-[#C8A96E] text-xs font-semibold tracking-[0.22em] uppercase">
                                C-Suite Executive · Strategic Leader · Management Consultant
                            </span>
                        </motion.div>
                        <motion.h3 variants={fadeUpVariants}
                            className="text-[#0B1F3A] text-3xl md:text-4xl font-bold mb-2 tracking-tight">
                            Adekunle Olusanya
                        </motion.h3>
                        <motion.div variants={{
                                hidden:  { scaleX: 0, opacity: 0 },
                                visible: { scaleX: 1, opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
                            }}
                            style={{ originX: 0, background: 'linear-gradient(to right, #C8A96E, rgba(200,169,110,0.15), transparent)' }}
                            className="h-[2px] w-12 mb-6"
                        />

                        {/* Bio — rewritten with real credibility from the pitch deck */}
                        <motion.div variants={fadeUpVariants} className="space-y-4 text-[#6A7D90] text-base leading-relaxed mb-8 font-light">
                            <p>
                                Adekunle Olusanya is a C-suite executive and strategic leader with over 20 years of cross-sector experience spanning telecoms, fintech, mobility, insurance, and management consulting. He has delivered $1B+ in infrastructure projects across Africa and advised organizations from early-stage startups to large corporates on strategy, transformation, and growth.
                            </p>
                            <p>
                                As the founder of Revamp Consulting LLC, he brings a practitioner's precision to every engagement — combining deep analytical rigor built at Huawei, Ericsson, and Nokia with board-level strategic advisory. His engagements have included expanding Sovereign Finance Group's strategic roadmap from ₦61B to ₦500B, driving 35% documented sales growth for JV Interiors, and deploying 17,000 electric vehicles as Head of Operations at QORAY Mobility.
                            </p>
                            <p>
                                He holds an Executive MBA in Finance from the University of Lagos Business School, is a certified PMP® from the Project Management Institute (USA), and has completed executive education at the University of Virginia Darden Business School.
                            </p>
                        </motion.div>

                        {/* Expertise tags */}
                        <motion.div variants={fadeUpVariants}>
                            <p className="text-[#0B1F3A] font-semibold text-xs mb-4 uppercase tracking-[0.18em]">
                                Areas of Expertise
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 mb-8">
                                {EXPERTISE.map((item, i) => (
                                    <motion.div key={item}
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={bioInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.5, delay: 0.5 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                                        className="flex items-start gap-2.5 group">
                                        <div className="w-1 h-1 rounded-full bg-[#C8A96E]/60 flex-shrink-0 mt-2 group-hover:bg-[#C8A96E] transition-colors" />
                                        <span className="text-[#6A7D90] text-sm group-hover:text-[#0B1F3A] transition-colors duration-200">
                                            {item}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* LinkedIn CTA */}
                        <motion.div variants={fadeUpVariants}>
                            <motion.a
                                href="https://www.linkedin.com/in/adekunle-olusanya"
                                target="_blank" rel="noopener noreferrer"
                                whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
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

                {/* ── Career Timeline ── */}
                <motion.div ref={careerRef}
                    initial={{ opacity: 0, y: 32 }}
                    animate={careerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-20 pt-12 border-t border-[#0B1F3A]/[0.07]"
                >
                    <p className="text-[#0B1F3A] font-semibold text-xs mb-8 uppercase tracking-[0.18em]">
                        20-Year Career Trajectory
                    </p>
                    <div className="relative">
                        {/* Connecting line */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={careerInView ? { scaleX: 1 } : {}}
                            transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute top-4 left-0 right-0 h-px origin-left hidden lg:block"
                            style={{ background: 'linear-gradient(to right, #C8A96E, rgba(200,169,110,0.2), transparent)' }}
                        />
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 lg:gap-0">
                            {CAREER.map(({ year, role, org, note }, i) => (
                                <motion.div
                                    key={org + year}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={careerInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className="group relative lg:pr-4"
                                >
                                    {/* Dot on line */}
                                    <div className="hidden lg:flex mb-4 items-center">
                                        <motion.div
                                            animate={{ scale: [1, 1.3, 1] }}
                                            transition={{ repeat: Infinity, duration: 2.5 + i * 0.3, ease: 'easeInOut', delay: i * 0.2 }}
                                            className="w-2.5 h-2.5 rounded-full bg-[#C8A96E] ring-4 ring-[#C8A96E]/15 flex-shrink-0"
                                        />
                                    </div>
                                    <div className="p-3.5 rounded-sm border border-[#0B1F3A]/[0.07] bg-white/50
                                                    hover:border-[#C8A96E]/30 hover:bg-white/80
                                                    transition-all duration-300 group-hover:-translate-y-1">
                                        <p className="text-[#C8A96E] text-[9px] font-bold tracking-wider uppercase mb-1">{year}</p>
                                        <p className="text-[#0B1F3A] font-bold text-xs leading-tight mb-0.5">{role}</p>
                                        <p className="text-[#7A8C9E] text-[11px] font-semibold mb-1">{org}</p>
                                        <p className="text-[#9AACBC] text-[10px] italic">{note}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}