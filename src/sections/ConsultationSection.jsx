import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Linkedin, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { AnimatedSection, itemVariants, SectionLabel, SectionTitle } from '../components/SectionWrapper';
import Button from '../components/Button';
import CalendlyPlaceholder from '../components/CalendlyPlaceholder';
import { submitLeadForm } from '../utils/submitLeadForm';
import trackEvent from '../utils/trackEvent';

// ── Contact info ───────────────────────────────────────────────────────────────
const contactInfo = [
    {
        icon: Phone,
        label: 'Phone',
        value: '+234 (0) 800 000 0000',
        href: 'tel:+2348000000000',
    },
    {
        icon: Mail,
        label: 'Email',
        value: 'info@revampconsulting.ng',
        href: 'mailto:info@revampconsulting.ng',
    },
    {
        icon: Linkedin,
        label: 'LinkedIn',
        value: 'Revamp Consulting LLC',
        href: 'https://www.linkedin.com/company/revamp-consulting-llc',
    },
    {
        icon: MapPin,
        label: 'Location',
        value: 'Lagos, Nigeria',
        href: null,
    },
];

// ── Service options ────────────────────────────────────────────────────────────
const SERVICE_OPTIONS = [
    { value: '', label: 'Select a service…' },
    { value: 'Strategy & Transformation', label: 'Strategy & Transformation' },
    { value: 'Financial Planning & Analysis', label: 'Financial Planning & Analysis' },
    { value: 'Technology & Digital Strategy', label: 'Technology & Digital Strategy' },
    { value: 'Retained Advisory', label: 'Retained Advisory' },
    { value: 'Project-Based Consulting', label: 'Project-Based Consulting' },
    { value: 'Fractional C-Suite', label: 'Fractional C-Suite' },
    { value: 'Executive Workshops', label: 'Executive Workshops' },
    { value: 'Other', label: 'Other' },
];

// ── Shared input className ─────────────────────────────────────────────────────
const inputClass = (hasError) =>
    `w-full bg-white/5 border ${hasError ? 'border-red-400/70' : 'border-white/15'} rounded-sm px-4 py-3.5 text-white text-sm placeholder-[#7A8C9E] focus:outline-none ${hasError ? 'focus:border-red-400' : 'focus:border-[#C8A96E]'} focus:bg-white/8 transition-all duration-200`;

// ── Validation helper ──────────────────────────────────────────────────────────
function validate(data) {
    const errs = {};
    if (!data.name.trim()) errs.name = 'Full name is required.';
    if (!data.email.trim()) errs.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        errs.email = 'Please enter a valid email address.';
    if (!data.service) errs.service = 'Please select a service.';
    if (!data.message.trim()) errs.message = 'Please describe your challenge or inquiry.';
    return errs;
}

// ── Field error label ──────────────────────────────────────────────────────────
function FieldError({ msg }) {
    if (!msg) return null;
    return (
        <p className="mt-1.5 flex items-center gap-1.5 text-red-400 text-xs">
            <AlertCircle size={11} />
            {msg}
        </p>
    );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function ConsultationSection() {
    const [formData, setFormData] = useState({
        name: '', company: '', email: '', phone: '', service: '', message: '',
        _hp: '', // honeypot — must stay empty
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear individual field error as user types
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');

        // Client-side validation
        const errs = validate(formData);
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        setLoading(true);

        const result = await submitLeadForm({
            fullName: formData.name,
            companyName: formData.company,
            email: formData.email,
            phone: formData.phone,
            serviceInterestedIn: formData.service,
            businessChallenge: formData.message,
            _hp: formData._hp,
        });

        setLoading(false);

        if (result.ok) {
            trackEvent('form_submission_success', { service: formData.service });
            setSubmitted(true);
        } else {
            trackEvent('form_submission_error', { error: result.error });
            setSubmitError(
                'Something went wrong submitting your request. Please try again or reach us directly by email.'
            );
        }
    };

    return (
        <section id="consultation" className="bg-[#0B1F3A] py-24 md:py-32 relative overflow-hidden" aria-labelledby="consultation-title">
            {/* Background pattern */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                aria-hidden="true"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(200, 169, 110, 0.2) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A] via-[#112952]/40 to-[#0B1F3A] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

                {/* Header */}
                <AnimatedSection className="max-w-2xl mb-16">
                    <motion.div variants={itemVariants}>
                        <SectionLabel>Get In Touch</SectionLabel>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <SectionTitle light id="consultation-title">
                            Let's Discuss Your{' '}
                            <span className="text-[#C8A96E]">Strategic Priorities</span>
                        </SectionTitle>
                    </motion.div>
                    <motion.p variants={itemVariants} className="text-[#A8B5C5] text-base md:text-lg leading-relaxed mt-4">
                        Whether you're navigating a strategic challenge, planning a transformation, or seeking a trusted advisory partner—we're here to help.
                    </motion.p>
                </AnimatedSection>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

                    {/* Contact Form column */}
                    <AnimatedSection className="lg:col-span-3">

                        {/* Calendly booking block */}
                        <CalendlyPlaceholder />

                        {submitted ? (
                            /* ── Success state ── */
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white/5 border border-[#C8A96E]/30 rounded-sm p-10 flex flex-col items-center justify-center text-center min-h-[400px]"
                            >
                                <CheckCircle size={48} className="text-[#C8A96E] mb-5" />
                                <h3 className="text-white text-2xl font-bold mb-3">Request Received</h3>
                                <p className="text-[#A8B5C5] text-base max-w-sm leading-relaxed">
                                    Thank you — your consultation request has been received. A member of the Revamp team will review your details and get back to you within one business day.
                                </p>
                                {/* Calendly follow-up nudge */}
                                <p className="text-[#7A8C9E] text-sm mt-5">
                                    Want to pick a time now?{' '}
                                    <motion.span
                                        whileHover={{ color: '#C8A96E' }}
                                        className="text-[#C8A96E] font-semibold cursor-pointer underline underline-offset-2"
                                        onClick={() => {
                                            // Replace '#' with live Calendly URL when ready
                                            window.open('#', '_blank');
                                            trackEvent('booking_click', { context: 'success_state' });
                                        }}
                                    >
                                        Book a time directly →
                                    </motion.span>
                                </p>
                            </motion.div>
                        ) : (
                            /* ── Form ── */
                            <motion.form
                                variants={itemVariants}
                                onSubmit={handleSubmit}
                                className="space-y-5"
                                noValidate
                                aria-label="Consultation request form"
                            >
                                {/* Honeypot — hidden from real users, bots will fill it */}
                                <div aria-hidden="true" className="absolute opacity-0 pointer-events-none h-0 overflow-hidden">
                                    <label htmlFor="_hp">Leave this field blank</label>
                                    <input
                                        id="_hp"
                                        name="_hp"
                                        type="text"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        value={formData._hp}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Name & Company */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="name" className="block text-[#C5CDD9] text-xs font-semibold tracking-wider uppercase mb-2">
                                            Full Name <span className="text-[#C8A96E]">*</span>
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your full name"
                                            className={inputClass(!!errors.name)}
                                            aria-describedby={errors.name ? 'name-error' : undefined}
                                        />
                                        <FieldError msg={errors.name} />
                                    </div>
                                    <div>
                                        <label htmlFor="company" className="block text-[#C5CDD9] text-xs font-semibold tracking-wider uppercase mb-2">
                                            Company
                                        </label>
                                        <input
                                            id="company"
                                            name="company"
                                            type="text"
                                            value={formData.company}
                                            onChange={handleChange}
                                            placeholder="Organization name"
                                            className={inputClass(false)}
                                        />
                                    </div>
                                </div>

                                {/* Email & Phone */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="email" className="block text-[#C5CDD9] text-xs font-semibold tracking-wider uppercase mb-2">
                                            Email Address <span className="text-[#C8A96E]">*</span>
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@company.com"
                                            className={inputClass(!!errors.email)}
                                            aria-describedby={errors.email ? 'email-error' : undefined}
                                        />
                                        <FieldError msg={errors.email} />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-[#C5CDD9] text-xs font-semibold tracking-wider uppercase mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+234 (0) 800 000 0000"
                                            className={inputClass(false)}
                                        />
                                    </div>
                                </div>

                                {/* Service Interested In */}
                                <div>
                                    <label htmlFor="service" className="block text-[#C5CDD9] text-xs font-semibold tracking-wider uppercase mb-2">
                                        Service Interested In <span className="text-[#C8A96E]">*</span>
                                    </label>
                                    <select
                                        id="service"
                                        name="service"
                                        required
                                        value={formData.service}
                                        onChange={handleChange}
                                        className={`${inputClass(!!errors.service)} appearance-none`}
                                        aria-describedby={errors.service ? 'service-error' : undefined}
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%237A8C9E' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'right 1rem center',
                                        }}
                                    >
                                        {SERVICE_OPTIONS.map((opt) => (
                                            <option
                                                key={opt.value}
                                                value={opt.value}
                                                className="bg-[#0B1F3A] text-white"
                                                disabled={opt.value === ''}
                                            >
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                    <FieldError msg={errors.service} />
                                </div>

                                {/* Business Challenge / Message */}
                                <div>
                                    <label htmlFor="message" className="block text-[#C5CDD9] text-xs font-semibold tracking-wider uppercase mb-2">
                                        Business Challenge or Inquiry <span className="text-[#C8A96E]">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Briefly describe your current challenge or what you're looking to achieve..."
                                        className={`${inputClass(!!errors.message)} resize-none`}
                                        aria-describedby={errors.message ? 'message-error' : undefined}
                                    />
                                    <FieldError msg={errors.message} />
                                </div>

                                {/* Submission error banner */}
                                {submitError && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-start gap-3 p-4 rounded-sm bg-red-500/10 border border-red-400/30"
                                    >
                                        <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                                        <p className="text-red-400 text-sm leading-relaxed">{submitError}</p>
                                    </motion.div>
                                )}

                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    disabled={loading}
                                    className="w-full sm:w-auto group"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-4 h-4 border-2 border-[#0B1F3A]/30 border-t-[#0B1F3A] rounded-full animate-spin" />
                                            Sending…
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Schedule a Consultation
                                            <Send size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                                        </span>
                                    )}
                                </Button>
                            </motion.form>
                        )}
                    </AnimatedSection>

                    {/* Contact Info column */}
                    <AnimatedSection className="lg:col-span-2">
                        <motion.div variants={itemVariants} className="mb-8">
                            <h3 className="text-white font-semibold text-lg mb-1">Direct Contact</h3>
                            <p className="text-[#7A8C9E] text-sm">Prefer to reach us directly? Here are our contact details.</p>
                        </motion.div>

                        <div className="space-y-5">
                            {contactInfo.map((info) => {
                                const Icon = info.icon;
                                const content = (
                                    <div className="flex items-start gap-4 group">
                                        <div className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C8A96E]/10 group-hover:border-[#C8A96E]/30 transition-all duration-200">
                                            <Icon size={16} className="text-[#C8A96E]" />
                                        </div>
                                        <div>
                                            <p className="text-[#7A8C9E] text-xs uppercase tracking-wider font-medium mb-0.5">{info.label}</p>
                                            <p className="text-white text-sm font-medium group-hover:text-[#C8A96E] transition-colors duration-200">{info.value}</p>
                                        </div>
                                    </div>
                                );

                                return (
                                    <motion.div key={info.label} variants={itemVariants}>
                                        {info.href ? (
                                            <a href={info.href} target={info.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="block">
                                                {content}
                                            </a>
                                        ) : content}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Response time note */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-8 p-5 bg-white/4 border border-white/10 rounded-sm"
                        >
                            <p className="text-[#C8A96E] text-xs font-semibold uppercase tracking-wider mb-1.5">Response Time</p>
                            <p className="text-[#A8B5C5] text-sm leading-relaxed">
                                We respond to all consultation inquiries within <strong className="text-white">one business day</strong>. For urgent matters, please call directly.
                            </p>
                        </motion.div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
