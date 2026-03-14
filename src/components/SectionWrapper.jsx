import { motion } from 'framer-motion';

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

export function SectionWrapper({
    children,
    id,
    className = '',
    background = 'white',
    padded = true,
}) {
    const bgClasses = {
        white: 'bg-white',
        offwhite: 'bg-[#F8F9FA]',
        navy: 'bg-[#0B1F3A]',
        charcoal: 'bg-[#1C2B3A]',
        subtle: 'bg-gradient-to-b from-[#F8F9FA] to-white',
    };

    return (
        <section
            id={id}
            className={`${bgClasses[background]} ${padded ? 'py-24 md:py-32' : ''} ${className}`}
        >
            {children}
        </section>
    );
}

export function SectionLabel({ children, light = false }) {
    return (
        <span
            className={`inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 ${light ? 'text-[#C8A96E]' : 'text-[#C8A96E]'
                }`}
        >
            {children}
        </span>
    );
}

export function SectionTitle({ children, light = false, className = '' }) {
    return (
        <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${light ? 'text-white' : 'text-[#0B1F3A]'
                } ${className}`}
        >
            {children}
        </h2>
    );
}

export function SectionSubtitle({ children, light = false, className = '' }) {
    return (
        <p
            className={`text-base md:text-lg leading-relaxed mt-4 max-w-2xl ${light ? 'text-[#C5CDD9]' : 'text-[#7A8C9E]'
                } ${className}`}
        >
            {children}
        </p>
    );
}

export function AnimatedSection({ children, className = '' }) {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export { itemVariants };
export default SectionWrapper;
