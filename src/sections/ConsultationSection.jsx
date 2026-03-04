import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, Linkedin, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useRef } from 'react';
import Button from '../components/Button';
import CalendlyPlaceholder from '../components/CalendlyPlaceholder';
import { submitLeadForm } from '../utils/submitLeadForm';
import trackEvent from '../utils/trackEvent';

// ── Contact info ───────────────────────────────────────────────────────────────
const contactInfo = [
    { icon: Phone,    label: 'Phone',    value: '+234 (0) 800 000 0000',          href: 'tel:+2348000000000' },
    { icon: Mail,     label: 'Email',    value: 'info@revampconsulting.ng',        href: 'mailto:info@revampconsulting.ng' },
    { icon: Linkedin, label: 'LinkedIn', value: 'Revamp Consulting LLC',           href: 'https://www.linkedin.com/company/revamp-consulting-llc' },
    { icon: MapPin,   label: 'Location', value: 'Lagos, Nigeria',                 href: null },
];

const SERVICE_OPTIONS = [
    { value: '',                            label: 'Select a service…' },
    { value: 'Strategy & Transformation',  label: 'Strategy & Transformation' },
    { value: 'Financial Planning & Analysis', label: 'Financial Planning & Analysis' },
    { value: 'Technology & Digital Strategy', label: 'Technology & Digital Strategy' },
    { value: 'Retained Advisory',          label: 'Retained Advisory' },
    { value: 'Project-Based Consulting',   label: 'Project-Based Consulting' },
    { value: 'Fractional C-Suite',         label: 'Fractional C-Suite' },
    { value: 'Executive Workshops',        label: 'Executive Workshops' },
    { value: 'Other',                      label: 'Other' },
];

// ── Shared classes ─────────────────────────────────────────────────────────────
const inputClass = (hasError) =>
    `w-full bg-white/[0.05] border ${hasError ? 'border-red-400/60' : 'border-white/[0.12]'} rounded-sm px-4 py-3.5 text-white text-sm placeholder-[#4A5E72] focus:outline-none ${hasError ? 'focus:border-red-400' : 'focus:border-[#C8A96E]/60'} focus:bg-white/[0.08] backdrop-blur-sm transition-all duration-200`;

const labelClass = 'block text-[#8899AA] text-[10px] font-semibold tracking-[0.18em] uppercase mb-2';

function validate(data) {
    const errs = {};
    if (!data.name.trim())    errs.name    = 'Full name is required.';
    if (!data.email.trim())   errs.email   = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Please enter a valid email address.';
    if (!data.service)        errs.service = 'Please select a service.';
    if (!data.message.trim()) errs.message = 'Please describe your challenge or inquiry.';
    return errs;
}

function FieldError({ msg }) {
    if (!msg) return null;
    return (
        <p className="mt-1.5 flex items-center gap-1.5 text-red-400 text-xs">
            <AlertCircle size={11} />{msg}
        </p>
    );
}

// ── Variants ──────────────────────────────────────────────────────────────────
const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const fadeUp = {
    hidden:  { opacity: 0, y: 30, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
        transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] } },
};

// ── Main component ─────────────────────────────────────────────────────────────
export default function ConsultationSection() {
    const headerRef  = useRef(null);
    const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
    const formRef    = useRef(null);
    const formInView = useInView(formRef, { once: true, margin: '-60px' });
    const sideRef    = useRef(null);
    const sideInView = useInView(sideRef, { once: true, margin: '-60px' });

    const [formData, setFormData] = useState({
        name: '', company: '', email: '', phone: '', service: '', message: '', _hp: '',
    });
    const [errors,      setErrors]      = useState({});
    const [submitted,   setSubmitted]   = useState(false);
    const [loading,     setLoading]     = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');
        const errs = validate(formData);
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        setLoading(true);
        const result = await submitLeadForm({
            fullName: formData.name, companyName: formData.company,
            email: formData.email, phone: formData.phone,
            serviceInterestedIn: formData.service, businessChallenge: formData.message,
            _hp: formData._hp,
        });
        setLoading(false);
        if (result.ok) {
            trackEvent('form_submission_success', { service: formData.service });
            setSubmitted(true);
        } else {
            trackEvent('form_submission_error', { error: result.error });
            setSubmitError('Something went wrong. Please try again or reach us directly by email.');
        }
    };

    return (
        <section
            id="consultation"
            className="relative overflow-hidden py-28 md:py-36"
            aria-labelledby="consultation-title"
        >
            {/* ── Background image ── */}
            <div className="absolute inset-0" aria-hidden="true">
                <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2070&q=80"
                    alt=""
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                />
            </div>

            {/* ── Cinematic overlays ── */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute inset-0 bg-[#040C1C]/90" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#040C1C]/85 via-[#0B1F3A]/65 to-[#040C1C]/80" />
                <div
                    className="absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.05) 0%, transparent 60%)' }}
                />
                {/* Film grain */}
                <div
                    className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat', backgroundSize: '200px 200px',
                    }}
                />
            </div>

            {/* Dot grid */}
            <div
                className="absolute inset-0 opacity-[0.045] pointer-events-none"
                aria-hidden="true"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(200,169,110,0.4) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                }}
            />

            {/* Ambient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <motion.div
                    animate={{ scale: [1, 1.08, 1], opacity: [0.05, 0.1, 0.05] }}
                    transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
                    className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(200,169,110,0.25) 0%, transparent 65%)' }}
                />
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.07, 0.03] }}
                    transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut', delay: 4 }}
                    className="absolute -bottom-24 -left-24 w-[600px] h-[600px] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(200,169,110,0.2) 0%, transparent 65%)' }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

                {/* ── Header ── */}
                <motion.div
                    ref={headerRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate={headerInView ? 'visible' : 'hidden'}
                    className="max-w-2xl mb-14 md:mb-16"
                >
                    <motion.div variants={fadeUp} className="mb-4">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm
                                         bg-[#C8A96E]/10 border border-[#C8A96E]/25
                                         text-[#C8A96E] text-xs font-semibold tracking-[0.2em] uppercase backdrop-blur-sm">
                            <motion.span
                                animate={{ opacity: [1, 0.25, 1] }}
                                transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                                className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]"
                            />
                            Get In Touch
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={fadeUp}
                        id="consultation-title"
                        className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-4"
                    >
                        <span className="text-white">Let's Discuss Your </span>
                        <span className="text-[#C8A96E] drop-shadow-[0_0_24px_rgba(200,169,110,0.25)]">
                            Strategic Priorities
                        </span>
                    </motion.h2>

                    <motion.div
                        variants={{
                            hidden:  { scaleX: 0, opacity: 0 },
                            visible: { scaleX: 1, opacity: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
                        }}
                        style={{ originX: 0, background: 'linear-gradient(to right, #C8A96E, rgba(200,169,110,0.2), transparent)' }}
                        className="h-[2px] w-16 mb-5"
                    />

                    <motion.p variants={fadeUp} className="text-[#7A8C9E] text-base md:text-lg leading-relaxed font-light">
                        Whether you're navigating a strategic challenge, planning a transformation,
                        or seeking a trusted advisory partner — we're here to help.
                    </motion.p>
                </motion.div>

                {/* ── Two-column grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">

                    {/* ── Form column ── */}
                    <motion.div
                        ref={formRef}
                        initial={{ opacity: 0, y: 44, filter: 'blur(8px)' }}
                        animate={formInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-3"
                    >
                        {/* Calendly */}
                        <CalendlyPlaceholder />

                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative overflow-hidden rounded-sm border border-[#C8A96E]/25
                                           bg-white/[0.04] backdrop-blur-md
                                           p-10 flex flex-col items-center justify-center text-center min-h-[400px]"
                            >
                                <div className="absolute inset-0 pointer-events-none"
                                    style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(200,169,110,0.07) 0%, transparent 65%)' }}
                                />
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                                >
                                    <CheckCircle size={48} className="text-[#C8A96E] mb-5" />
                                </motion.div>
                                <h3 className="text-white text-2xl font-bold mb-3">Request Received</h3>
                                <p className="text-[#8899AA] text-base max-w-sm leading-relaxed">
                                    Thank you — your consultation request has been received. A member of the Revamp team will get back to you within one business day.
                                </p>
                                <p className="text-[#6A7D90] text-sm mt-5">
                                    Want to pick a time now?{' '}
                                    <span
                                        className="text-[#C8A96E] font-semibold cursor-pointer underline underline-offset-2 hover:text-[#D4BC8A] transition-colors"
                                        onClick={() => { window.open('#', '_blank'); trackEvent('booking_click', { context: 'success_state' }); }}
                                    >
                                        Book a time directly →
                                    </span>
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5" noValidate aria-label="Consultation request form">

                                {/* Honeypot */}
                                <div aria-hidden="true" className="absolute opacity-0 pointer-events-none h-0 overflow-hidden">
                                    <input id="_hp" name="_hp" type="text" tabIndex={-1} autoComplete="off"
                                        value={formData._hp} onChange={handleChange} />
                                </div>

                                {/* Name & Company */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="name" className={labelClass}>
                                            Full Name <span className="text-[#C8A96E]">*</span>
                                        </label>
                                        <input id="name" name="name" type="text" required
                                            value={formData.name} onChange={handleChange}
                                            placeholder="Your full name" className={inputClass(!!errors.name)} />
                                        <FieldError msg={errors.name} />
                                    </div>
                                    <div>
                                        <label htmlFor="company" className={labelClass}>Company</label>
                                        <input id="company" name="company" type="text"
                                            value={formData.company} onChange={handleChange}
                                            placeholder="Organization name" className={inputClass(false)} />
                                    </div>
                                </div>

                                {/* Email & Phone */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="email" className={labelClass}>
                                            Email Address <span className="text-[#C8A96E]">*</span>
                                        </label>
                                        <input id="email" name="email" type="email" required
                                            value={formData.email} onChange={handleChange}
                                            placeholder="you@company.com" className={inputClass(!!errors.email)} />
                                        <FieldError msg={errors.email} />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className={labelClass}>Phone Number</label>
                                        <input id="phone" name="phone" type="tel"
                                            value={formData.phone} onChange={handleChange}
                                            placeholder="+234 (0) 800 000 0000" className={inputClass(false)} />
                                    </div>
                                </div>

                                {/* Service */}
                                <div>
                                    <label htmlFor="service" className={labelClass}>
                                        Service Interested In <span className="text-[#C8A96E]">*</span>
                                    </label>
                                    <select id="service" name="service" required
                                        value={formData.service} onChange={handleChange}
                                        className={`${inputClass(!!errors.service)} appearance-none`}
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%237A8C9E' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                                            backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center',
                                        }}
                                    >
                                        {SERVICE_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}
                                                className="bg-[#0B1F3A] text-white" disabled={opt.value === ''}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                    <FieldError msg={errors.service} />
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className={labelClass}>
                                        Business Challenge or Inquiry <span className="text-[#C8A96E]">*</span>
                                    </label>
                                    <textarea id="message" name="message" required rows={5}
                                        value={formData.message} onChange={handleChange}
                                        placeholder="Briefly describe your current challenge or what you're looking to achieve..."
                                        className={`${inputClass(!!errors.message)} resize-none`} />
                                    <FieldError msg={errors.message} />
                                </div>

                                {/* Submit error */}
                                {submitError && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                                        className="flex items-start gap-3 p-4 rounded-sm bg-red-500/10 border border-red-400/25"
                                    >
                                        <AlertCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                                        <p className="text-red-400 text-sm leading-relaxed">{submitError}</p>
                                    </motion.div>
                                )}

                                <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
                                    style={{ display: 'inline-block', filter: 'drop-shadow(0 8px 24px rgba(200,169,110,0.22))' }}>
                                    <Button type="submit" variant="primary" size="lg" disabled={loading} className="group">
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <span className="w-4 h-4 border-2 border-[#0B1F3A]/30 border-t-[#0B1F3A] rounded-full animate-spin" />
                                                Sending…
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                Schedule a Consultation
                                                <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                                            </span>
                                        )}
                                    </Button>
                                </motion.div>
                            </form>
                        )}
                    </motion.div>

                    {/* ── Sidebar ── */}
                    <motion.div
                        ref={sideRef}
                        variants={containerVariants}
                        initial="hidden"
                        animate={sideInView ? 'visible' : 'hidden'}
                        className="lg:col-span-2 flex flex-col gap-6"
                    >
                        {/* Heading */}
                        <motion.div variants={fadeUp}>
                            <h3 className="text-white font-bold text-xl mb-1 tracking-tight">Direct Contact</h3>
                            <motion.div
                                initial={{ scaleX: 0 }} animate={sideInView ? { scaleX: 1 } : {}}
                                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                style={{ originX: 0, background: 'linear-gradient(to right, #C8A96E, transparent)' }}
                                className="h-[2px] w-10 mt-2"
                            />
                            <p className="text-[#6A7D90] text-sm mt-3 font-light">
                                Prefer to reach us directly? Here are our contact details.
                            </p>
                        </motion.div>

                        {/* Contact cards */}
                        <div className="flex flex-col gap-3">
                            {contactInfo.map(({ icon: Icon, label, value, href }, i) => {
                                const inner = (
                                    <motion.div
                                        variants={fadeUp}
                                        whileHover={{ x: 3 }}
                                        transition={{ duration: 0.2 }}
                                        className="group flex items-center gap-4
                                                   px-5 py-4 rounded-sm
                                                   border border-white/[0.07] bg-white/[0.04] backdrop-blur-sm
                                                   hover:border-[#C8A96E]/35 hover:bg-white/[0.07]
                                                   transition-all duration-300 cursor-default"
                                    >
                                        <div className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0
                                                        bg-[#C8A96E]/10 border border-[#C8A96E]/20
                                                        group-hover:bg-[#C8A96E]/18 group-hover:border-[#C8A96E]/35
                                                        transition-all duration-300">
                                            <Icon size={15} className="text-[#C8A96E]" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[#6A7D90] text-[10px] uppercase tracking-[0.16em] font-semibold mb-0.5">{label}</p>
                                            <p className="text-white/85 text-sm font-medium truncate group-hover:text-[#C8A96E] transition-colors duration-300">{value}</p>
                                        </div>
                                    </motion.div>
                                );
                                return (
                                    <div key={label}>
                                        {href
                                            ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{inner}</a>
                                            : inner}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Response time card */}
                        <motion.div
                            variants={fadeUp}
                            className="relative overflow-hidden rounded-sm border border-[#C8A96E]/18
                                       bg-white/[0.04] backdrop-blur-sm p-5"
                        >
                            <div
                                className="absolute left-0 inset-y-0 w-[3px] pointer-events-none"
                                style={{ background: 'linear-gradient(to bottom, transparent, rgba(200,169,110,0.65), transparent)' }}
                            />
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(200,169,110,0.05) 0%, transparent 60%)' }}
                            />
                            <p className="text-[#C8A96E] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Response Time</p>
                            <p className="text-[#8899AA] text-sm leading-relaxed font-light">
                                We respond to all consultation inquiries within{' '}
                                <span className="text-white font-semibold">one business day</span>.
                                For urgent matters, please call directly.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}