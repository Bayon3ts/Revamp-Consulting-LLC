import { motion } from 'framer-motion';
import { Handshake, FileCheck, Users, PresentationIcon } from 'lucide-react';
import { AnimatedSection, itemVariants, SectionLabel, SectionTitle } from '../components/SectionWrapper';
import Button from '../components/Button';
import trackEvent from '../utils/trackEvent';

const iconMap = {
    Handshake: Handshake,
    FileCheck: FileCheck,
    Users: Users,
    PresentationIcon: PresentationIcon,
};

const engagementModels = [
    {
        id: 'retained',
        icon: 'Handshake',
        title: 'Retained Advisory',
        description: 'An ongoing advisory relationship providing consistent strategic counsel and executive access on a monthly retainer. Ideal for organizations requiring continuous guidance and a trusted strategic partner.',
        ideal: 'Ongoing guidance',
    },
    {
        id: 'project',
        icon: 'FileCheck',
        title: 'Project-Based Consulting',
        description: 'Defined engagements with clear deliverables, timelines, and outcomes. Best suited for specific strategic initiatives, market entry projects, or time-bound organizational transformations.',
        ideal: 'Specific initiatives',
    },
    {
        id: 'fractional',
        icon: 'Users',
        title: 'Fractional C-Suite',
        description: 'Senior leadership expertise on a part-time basis. Access the strategic depth of a seasoned CFO, COO, or CSO without the cost and commitment of a full-time C-level hire.',
        ideal: 'Leadership gap',
    },
    {
        id: 'workshops',
        icon: 'PresentationIcon',
        title: 'Executive Workshops',
        description: 'High-impact, facilitated working sessions designed to align leadership teams, solve entrenched strategic problems, and build organizational capability in a condensed format.',
        ideal: 'Team alignment',
    },
];

export default function EngagementModelsSection() {
    return (
        <section id="engagement" className="bg-[#F8F9FA] py-24 md:py-32" aria-labelledby="engagement-title">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">

                {/* Header */}
                <AnimatedSection className="max-w-2xl mb-16 md:mb-20">
                    <motion.div variants={itemVariants}>
                        <SectionLabel>Engagement Models</SectionLabel>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <SectionTitle id="engagement-title">
                            How We Work{' '}
                            <span className="text-[#C8A96E]">With Clients</span>
                        </SectionTitle>
                    </motion.div>
                    <motion.p variants={itemVariants} className="text-[#7A8C9E] text-base md:text-lg leading-relaxed mt-4">
                        We offer flexible engagement structures designed to match your organization's needs, budget, and timeline.
                    </motion.p>
                </AnimatedSection>

                {/* Cards */}
                <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {engagementModels.map((model, index) => {
                        const Icon = iconMap[model.icon];
                        return (
                            <motion.div
                                key={model.id}
                                variants={itemVariants}
                                className="group bg-white border border-[#EEF1F5] rounded-sm p-8 md:p-10 hover:border-[#C8A96E]/40 hover:shadow-xl hover:shadow-[#0B1F3A]/6 transition-all duration-350 relative overflow-hidden"
                            >
                                {/* Background number watermark */}
                                <span className="absolute right-6 top-4 text-6xl font-bold text-[#EEF1F5] select-none group-hover:text-[#C8A96E]/8 transition-colors duration-300">
                                    {String(index + 1).padStart(2, '0')}
                                </span>

                                {/* Icon */}
                                <div className="w-12 h-12 rounded-sm bg-[#0B1F3A] flex items-center justify-center mb-6 group-hover:bg-[#C8A96E] transition-colors duration-300">
                                    {Icon && <Icon size={22} className="text-[#C8A96E] group-hover:text-[#0B1F3A] transition-colors duration-300" />}
                                </div>

                                <h3 className="text-[#0B1F3A] font-bold text-xl mb-3">{model.title}</h3>
                                <p className="text-[#7A8C9E] text-sm leading-relaxed mb-6">{model.description}</p>

                                {/* Ideal for tag */}
                                <div className="inline-flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]" />
                                    <span className="text-xs font-medium text-[#C8A96E] tracking-wider uppercase">Ideal for: {model.ideal}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatedSection>

                {/* CTA — single, centered, appears after all cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-14 flex justify-center"
                >
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => {
                            trackEvent('engagement_cta_click');
                            const el = document.querySelector('#consultation');
                            if (el) {
                                const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
                                window.scrollTo({ top, behavior: 'smooth' });
                            }
                        }}
                    >
                        Book a Consultation
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
