import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Button from '../components/Button';

const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Impact', href: '#impact' },
    { label: 'Leadership', href: '#leadership' },
    { label: 'How We Work', href: '#engagement' },
    { label: 'Contact', href: '#consultation' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 48);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) {
            const offset = 80;
            const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.header
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                        ? 'bg-[#0B1F3A]/98 backdrop-blur-md shadow-lg shadow-black/10'
                        : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="flex items-center gap-3 group"
                            aria-label="Revamp Consulting LLC - Home"
                        >
                            <div className="w-8 h-8 bg-[#C8A96E] rounded-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4BC8A] transition-colors duration-200">
                                <span className="text-[#0B1F3A] font-bold text-sm tracking-tight">RC</span>
                            </div>
                            <div className="leading-tight">
                                <span className="text-white font-bold text-base tracking-wide block leading-none">Revamp</span>
                                <span className="text-[#C8A96E] text-[10px] font-medium tracking-[0.15em] uppercase">Consulting LLC</span>
                            </div>
                        </a>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
                            {navLinks.map((link) => (
                                <button
                                    key={link.label}
                                    onClick={() => handleNavClick(link.href)}
                                    className="text-[#C5CDD9] hover:text-white text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer bg-transparent border-none relative group"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C8A96E] group-hover:w-full transition-all duration-300" />
                                </button>
                            ))}
                        </nav>

                        {/* Desktop CTA */}
                        <div className="hidden lg:flex items-center">
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handleNavClick('#consultation')}
                            >
                                Book a Consultation
                            </Button>
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden text-white p-2 rounded-sm hover:bg-white/10 transition-colors duration-200"
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileOpen}
                        >
                            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="fixed inset-0 z-40 bg-[#0B1F3A] pt-20 px-6 overflow-y-auto lg:hidden"
                    >
                        <nav className="flex flex-col gap-2 pt-6" aria-label="Mobile navigation">
                            {navLinks.map((link, i) => (
                                <motion.button
                                    key={link.label}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.07, duration: 0.3 }}
                                    onClick={() => handleNavClick(link.href)}
                                    className="text-left text-white text-xl font-medium py-4 border-b border-white/10 hover:text-[#C8A96E] transition-colors duration-200 bg-transparent border-x-0 border-t-0 cursor-pointer w-full"
                                >
                                    {link.label}
                                </motion.button>
                            ))}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="pt-6"
                            >
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => handleNavClick('#consultation')}
                                    className="w-full justify-center"
                                >
                                    Book a Consultation
                                </Button>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
