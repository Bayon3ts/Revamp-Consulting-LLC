import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Linkedin, MapPin, Send, CheckCircle } from 'lucide-react';
import { AnimatedSection, itemVariants, SectionLabel, SectionTitle } from '../components/SectionWrapper';
import Button from '../components/Button';

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

export default function ConsultationSection() {
    const [formData, setFormData] = useState({
        name: '', company: '', email: '', phone: '', message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate submission
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setSubmitted(true);
        setLoading(false);
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

                    {/* Contact Form */}
                    <AnimatedSection className="lg:col-span-3">
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white/5 border border-[#C8A96E]/30 rounded-sm p-10 flex flex-col items-center justify-center text-center min-h-[400px]"
                            >
                                <CheckCircle size={48} className="text-[#C8A96E] mb-5" />
                                <h3 className="text-white text-2xl font-bold mb-3">Message Received</h3>
                                <p className="text-[#A8B5C5] text-base max-w-sm leading-relaxed">
                                    Thank you for reaching out. A member of the Revamp team will contact you within one business day.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.form
                                variants={itemVariants}
                                onSubmit={handleSubmit}
                                className="space-y-5"
                                noValidate
                                aria-label="Consultation request form"
                            >
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
                                            className="w-full bg-white/5 border border-white/15 rounded-sm px-4 py-3.5 text-white text-sm placeholder-[#7A8C9E] focus:outline-none focus:border-[#C8A96E] focus:bg-white/8 transition-all duration-200"
                                        />
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
                                            className="w-full bg-white/5 border border-white/15 rounded-sm px-4 py-3.5 text-white text-sm placeholder-[#7A8C9E] focus:outline-none focus:border-[#C8A96E] focus:bg-white/8 transition-all duration-200"
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
                                            className="w-full bg-white/5 border border-white/15 rounded-sm px-4 py-3.5 text-white text-sm placeholder-[#7A8C9E] focus:outline-none focus:border-[#C8A96E] focus:bg-white/8 transition-all duration-200"
                                        />
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
                                            className="w-full bg-white/5 border border-white/15 rounded-sm px-4 py-3.5 text-white text-sm placeholder-[#7A8C9E] focus:outline-none focus:border-[#C8A96E] focus:bg-white/8 transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-[#C5CDD9] text-xs font-semibold tracking-wider uppercase mb-2">
                                        Strategic Challenge or Inquiry <span className="text-[#C8A96E]">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Briefly describe your current challenge or what you're looking to achieve..."
                                        className="w-full bg-white/5 border border-white/15 rounded-sm px-4 py-3.5 text-white text-sm placeholder-[#7A8C9E] focus:outline-none focus:border-[#C8A96E] focus:bg-white/8 transition-all duration-200 resize-none"
                                    />
                                </div>

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
                                            Sending...
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

                    {/* Contact Info */}
                    <AnimatedSection className="lg:col-span-2">
                        <motion.div variants={itemVariants} className="mb-8">
                            <h3 className="text-white font-semibold text-lg mb-1">Direct Contact</h3>
                            <p className="text-[#7A8C9E] text-sm">Prefer to reach us directly? Here are our contact details.</p>
                        </motion.div>

                        <div className="space-y-5">
                            {contactInfo.map((info, i) => {
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
