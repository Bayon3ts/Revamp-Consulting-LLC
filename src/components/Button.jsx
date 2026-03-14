import { motion } from 'framer-motion';

const variants = {
    primary: 'bg-[#C8A96E] hover:bg-[#B8956A] text-[#0B1F3A] font-semibold shadow-lg hover:shadow-xl',
    secondary: 'bg-transparent border-2 border-[#C8A96E] text-[#C8A96E] hover:bg-[#C8A96E] hover:text-[#0B1F3A] font-semibold',
    ghost: 'bg-transparent text-white border border-white/30 hover:bg-white/10 font-medium',
    navy: 'bg-[#0B1F3A] hover:bg-[#112952] text-white font-semibold shadow-lg hover:shadow-xl',
};

const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-sm',
    lg: 'px-9 py-4 text-base',
};

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    href,
    onClick,
    className = '',
    disabled = false,
    type = 'button',
    ...props
}) {
    const baseClasses = `inline-flex items-center justify-center gap-2 rounded-sm transition-all duration-300 tracking-wide cursor-pointer ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

    const motionProps = {
        whileHover: disabled ? {} : { scale: 1.02 },
        whileTap: disabled ? {} : { scale: 0.98 },
    };

    if (href) {
        return (
            <motion.a href={href} className={baseClasses} {...motionProps} {...props}>
                {children}
            </motion.a>
        );
    }

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={baseClasses}
            {...motionProps}
            {...props}
        >
            {children}
        </motion.button>
    );
}
