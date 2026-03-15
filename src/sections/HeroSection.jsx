import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import Button from '../components/Button';
import trackEvent from '../utils/trackEvent';

// ─── Word config for headline ─────────────────────────────────────────────────

const HEADLINE_WORDS = [
    { text: 'Strategic', gold: false },
    { text: 'Clarity.', gold: false },
    { text: 'Operational', gold: true },
    { text: 'Excellence.', gold: false },
    { text: 'Sustainable', gold: false },
    { text: 'Growth.', gold: false },
];

// ─── Floating Particles ───────────────────────────────────────────────────────

function Particles({ count = 24 }) {
    const particles = useRef(
        Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            startY: 60 + Math.random() * 40,
            size: 0.8 + Math.random() * 2,
            duration: 7 + Math.random() * 10,
            delay: Math.random() * 9,
            drift: (Math.random() - 0.5) * 120,
        }))
    ).current;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.startY}%`,
                        width: p.size,
                        height: p.size,
                        background: `rgba(200,169,110,${0.25 + Math.random() * 0.45})`,
                        boxShadow: `0 0 ${p.size * 4}px rgba(200,169,110,0.55)`,
                    }}
                    animate={{
                        y: [0, -(200 + Math.random() * 180)],
                        x: [0, p.drift],
                        opacity: [0, 0.9, 0.6, 0],
                        scale: [0.4, 1, 0.7, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: 'easeOut',
                    }}
                />
            ))}
        </div>
    );
}

// ─── Animated Stat Counter ────────────────────────────────────────────────────

function AnimatedStat({ value, label, delay = 0 }) {
    const [display, setDisplay] = useState(value);
    const ref = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const numeric = parseFloat(value.replace(/[^0-9.]/g, ''));
                    const prefix = value.match(/^[^0-9]*/)?.[0] ?? '';
                    const suffix = value.match(/[^0-9.]*$/)?.[0] ?? '';
                    const isDecimal = value.includes('.');
                    const duration = 2000;
                    const start = performance.now();
                    const step = (now) => {
                        const progress = Math.min((now - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setDisplay(
                            `${prefix}${isDecimal ? (eased * numeric).toFixed(1) : Math.floor(eased * numeric)}${suffix}`
                        );
                        if (progress < 1) requestAnimationFrame(step);
                    };
                    setTimeout(() => requestAnimationFrame(step), delay);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value, delay]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.7 + delay / 1000, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 group cursor-default"
        >
            <span className="text-2xl font-bold text-[#C8A96E] tabular-nums transition-all duration-300 group-hover:scale-110 origin-left group-hover:drop-shadow-[0_0_14px_rgba(200,169,110,0.8)]">
                {display}
            </span>
            <span className="text-sm text-[#7A8C9E] leading-tight font-light tracking-wide">{label}</span>
        </motion.div>
    );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

export default function HeroSection() {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
    const bgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.07]);
    const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

    const handleScroll = (href) => {
        const el = document.querySelector(href);
        if (el) {
            const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative min-h-screen flex items-center overflow-hidden bg-black"
            aria-label="Hero section"
        >
            {/* ═══ BACKGROUND + KEN BURNS ═════════════════════════════════════ */}
            <motion.div
                style={{ y: bgY, scale: bgScale }}
                className="absolute inset-0 will-change-transform"
                aria-hidden="true"
            >
                {/* Ken Burns: slow zoom out from 1.18 → 1.0 */}
                <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.18 }}
                    animate={{ scale: 1.0 }}
                    transition={{ duration: 10, ease: [0.16, 1, 0.3, 1] }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2070&q=80"
                        alt=""
                        className="w-full h-full object-cover object-center"
                        loading="eager"
                        decoding="async"
                    />
                </motion.div>
            </motion.div>

            {/* ═══ CINEMATIC COLOUR GRADE ═════════════════════════════════════ */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute inset-0 bg-[#050D1A]/72" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#040C1C]/96 via-[#0A1C38]/68 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#040C1C]/55 via-transparent to-[#040C1C]/82" />
                {/* Radial edge vignette */}
                <div
                    className="absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 38%, rgba(3,8,20,0.72) 100%)' }}
                />
                {/* Film grain */}
                <div
                    className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '200px 200px',
                    }}
                />
            </div>

            {/* ═══ AMBIENT ORBS + GRID ════════════════════════════════════════ */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <motion.div
                    animate={{ scale: [1, 1.07, 1], opacity: [0.1, 0.19, 0.1] }}
                    transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
                    className="absolute -top-48 -right-48 w-[760px] h-[760px] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(200,169,110,0.17) 0%, transparent 65%)' }}
                />
                <motion.div
                    animate={{ scale: [1, 1.12, 1], opacity: [0.04, 0.09, 0.04] }}
                    transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut', delay: 3 }}
                    className="absolute -bottom-24 -left-24 w-[560px] h-[560px] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(200,169,110,0.11) 0%, transparent 65%)' }}
                />
                {/* Dot grid */}
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(200,169,110,0.45) 1px, transparent 1px)',
                        backgroundSize: '36px 36px',
                    }}
                />
                {/* Vertical gold accent line */}
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: '36%', opacity: 0.55 }}
                    transition={{ duration: 1.8, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-[15%] right-[17%] w-px hidden lg:block"
                    style={{ background: 'linear-gradient(to bottom, transparent, rgba(200,169,110,0.5), transparent)' }}
                />
            </div>

            {/* ═══ LIGHT SWEEP (one-shot) ═════════════════════════════════════ */}
            <motion.div
                initial={{ x: '-130%', opacity: 0.7 }}
                animate={{ x: '230%', opacity: 0 }}
                transition={{ duration: 1.7, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-y-0 w-[28%] pointer-events-none z-20"
                style={{
                    background: 'linear-gradient(108deg, transparent 20%, rgba(200,169,110,0.07) 50%, transparent 80%)',
                    transform: 'skewX(-14deg)',
                }}
                aria-hidden="true"
            />

            {/* ═══ PARTICLES ══════════════════════════════════════════════════ */}
            <Particles count={22} />

            {/* ═══ CONTENT ════════════════════════════════════════════════════ */}
            <motion.div
                style={{ y: contentY, opacity: contentOpacity }}
                className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-14 pt-32 pb-24"
            >
                <div className="max-w-[54rem]">

                    {/* — Eyebrow — */}
                    <motion.div
                        initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-8"
                    >
                        <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-sm bg-[#C8A96E]/10 border border-[#C8A96E]/22 text-[#C8A96E] text-xs font-semibold tracking-[0.22em] uppercase backdrop-blur-md">
                            <motion.span
                                animate={{ opacity: [1, 0.25, 1] }}
                                transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                                className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]"
                            />
                            Strategic Business Consulting
                        </span>
                    </motion.div>

                    {/* — Headline: word-by-word reveal — */}
                    <h1 className="text-[2.5rem] sm:text-5xl md:text-[3.6rem] lg:text-[4.4rem] font-bold leading-[1.07] tracking-tight mb-0">
                        {HEADLINE_WORDS.map((word, i) => (
                            <span key={i}>
                                <motion.span
                                    initial={{ opacity: 0, y: 52, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    transition={{
                                        duration: 0.72,
                                        delay: 1.35 + i * 0.14,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className={`inline-block mr-[0.26em] ${word.gold
                                            ? 'text-[#C8A96E] drop-shadow-[0_0_32px_rgba(200,169,110,0.38)]'
                                            : 'text-white'
                                        }`}
                                >
                                    {word.text}
                                </motion.span>
                                {/* Break after "Clarity." and after "Excellence." */}
                                {(i === 1 || i === 3) && <br className="hidden sm:block" />}
                            </span>
                        ))}
                    </h1>

                    {/* — Gold rule — */}
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        style={{ originX: 0, background: 'linear-gradient(to right, #C8A96E, rgba(200,169,110,0.2), transparent)' }}
                        transition={{ duration: 1.3, delay: 2.3, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-7 mb-7 h-[2px] w-20"
                    />

                    {/* — Subheadline — */}
                    <motion.p
                        initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.9, delay: 2.15, ease: [0.22, 1, 0.36, 1] }}
                        className="text-base md:text-lg text-[#7A8C9E] leading-relaxed max-w-xl mb-10 font-light tracking-wide"
                    >
                        Revamp Consulting partners with founders, executives, and organizations to
                        solve complex challenges, unlock growth opportunities, and execute
                        transformative strategies.
                    </motion.p>

                    {/* — CTAs — */}
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col sm:flex-row gap-4 mb-14"
                    >
                        <motion.div
                            whileHover={{ scale: 1.04, y: -3 }}
                            whileTap={{ scale: 0.97 }}
                            style={{ filter: 'drop-shadow(0 10px 28px rgba(200,169,110,0.28))' }}
                        >
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => { trackEvent('hero_cta_click'); handleScroll('#consultation'); }}
                                className="group w-full sm:w-auto"
                            >
                                Book a Consultation
                                <motion.span
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                                    className="inline-flex"
                                >
                                    <ArrowRight size={16} />
                                </motion.span>
                            </Button>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}>
                            <Button
                                variant="ghost"
                                size="lg"
                                onClick={() => handleScroll('#services')}
                                className="w-full sm:w-auto backdrop-blur-sm border-white/15 hover:border-[#C8A96E]/45 hover:text-[#C8A96E] transition-colors duration-300"
                            >
                                View Our Services
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* — Stats — */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 2.55 }}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 pt-6 border-t border-white/[0.07]"
                    >
                        {[
                            { value: '20+', label: 'Years Experience', delay: 0 },
                            { value: '₦500B', label: 'Growth Roadmap', delay: 200 },
                            { value: '35%', label: 'Avg. Sales Growth', delay: 400 },
                        ].map((stat) => (
                            <AnimatedStat key={stat.label} {...stat} />
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* ═══ CINEMATIC LETTERBOX BARS ═══════════════════════════════════ */}
            {/* Top bar slides up, bottom bar slides down — like a film reveal */}
            <motion.div
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{ duration: 1.1, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
                className="absolute top-0 left-0 right-0 h-[13vh] bg-black origin-top z-40 pointer-events-none"
                aria-hidden="true"
            />
            <motion.div
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{ duration: 1.1, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
                className="absolute bottom-0 left-0 right-0 h-[13vh] bg-black origin-bottom z-40 pointer-events-none"
                aria-hidden="true"
            />

            {/* ═══ SCROLL CUE ═════════════════════════════════════════════════ */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.1, duration: 0.9 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10 group"
                onClick={() => handleScroll('#problem')}
                aria-label="Scroll to next section"
            >
                <span className="text-[#3A4D5E] group-hover:text-[#C8A96E] transition-colors text-[10px] tracking-[0.28em] uppercase">
                    Scroll
                </span>
                {/* Travelling light line */}
                <div className="relative w-px h-10 overflow-hidden bg-white/5">
                    <motion.div
                        animate={{ y: ['-100%', '200%'] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                        className="absolute inset-x-0 h-1/2"
                        style={{ background: 'linear-gradient(to bottom, transparent, #C8A96E, transparent)' }}
                    />
                </div>
            </motion.div>
        </section>
    );
}