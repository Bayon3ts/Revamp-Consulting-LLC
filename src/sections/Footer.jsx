import { Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/logo.png';

const quickLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Our Impact', href: '#impact' },
    { label: 'Leadership', href: '#leadership' },
    { label: 'How We Work', href: '#engagement' },
    { label: 'Book a Consultation', href: '#consultation' },
];

export default function Footer() {
    const handleNavClick = (href) => {
        const el = document.querySelector(href);
        if (el) {
            const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    const year = new Date().getFullYear();

    return (
        <footer className="bg-[#080F1E] text-white pt-16 pb-8" aria-label="Site footer">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-5">
                            <img src={logo} alt="Revamp Consulting LLC" className="h-9 w-auto object-contain" />
                        </div>
                        <p className="text-[#7A8C9E] text-sm leading-relaxed max-w-sm mb-6">
                            Revamp Consulting LLC partners with founders, executives, and organizations to solve complex challenges, unlock growth opportunities, and execute transformative strategies across Africa and beyond.
                        </p>
                        {/* Social */}
                        <div className="flex items-center gap-3">
                            <a
                                href="https://www.linkedin.com/company/revamp-consulting-llc"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#C8A96E]/10 hover:border-[#C8A96E]/40 transition-all duration-200"
                                aria-label="Revamp Consulting on LinkedIn"
                            >
                                <Linkedin size={15} className="text-[#C8A96E]" />
                            </a>
                            <a
                                href="mailto:info@revampconsulting.ng"
                                className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#C8A96E]/10 hover:border-[#C8A96E]/40 transition-all duration-200"
                                aria-label="Email Revamp Consulting"
                            >
                                <Mail size={15} className="text-[#C8A96E]" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-sm uppercase tracking-[0.12em] mb-5">Quick Links</h3>
                        <ul className="space-y-3" role="list">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <button
                                        onClick={() => handleNavClick(link.href)}
                                        className="text-[#7A8C9E] text-sm hover:text-[#C8A96E] transition-colors duration-200 cursor-pointer bg-transparent border-none text-left"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold text-sm uppercase tracking-[0.12em] mb-5">Contact</h3>
                        <ul className="space-y-4" role="list">
                            <li>
                                <a href="mailto:info@revampconsulting.ng" className="flex items-start gap-3 text-[#7A8C9E] text-sm hover:text-[#C8A96E] transition-colors duration-200 group">
                                    <Mail size={14} className="mt-0.5 flex-shrink-0 text-[#C8A96E]" />
                                    info@revampconsulting.ng
                                </a>
                            </li>
                            <li>
                                <a href="tel:+2348000000000" className="flex items-start gap-3 text-[#7A8C9E] text-sm hover:text-[#C8A96E] transition-colors duration-200 group">
                                    <Phone size={14} className="mt-0.5 flex-shrink-0 text-[#C8A96E]" />
                                    +234 (0) 800 000 0000
                                </a>
                            </li>
                            <li>
                                <div className="flex items-start gap-3 text-[#7A8C9E] text-sm">
                                    <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[#C8A96E]" />
                                    Lagos, Nigeria
                                </div>
                            </li>
                            <li>
                                <a
                                    href="https://www.linkedin.com/company/revamp-consulting-llc"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-3 text-[#7A8C9E] text-sm hover:text-[#C8A96E] transition-colors duration-200"
                                >
                                    <Linkedin size={14} className="mt-0.5 flex-shrink-0 text-[#C8A96E]" />
                                    LinkedIn Profile
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[#4A5A6A] text-xs">
                        &copy; {year} Revamp Consulting LLC. All rights reserved.
                    </p>
                    <p className="text-[#4A5A6A] text-xs">
                        Strategic Advisory · Financial Modeling · Business Transformation
                    </p>
                </div>
            </div>
        </footer>
    );
}
