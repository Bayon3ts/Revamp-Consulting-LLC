import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function AnimatedCounter({ end, prefix = '', suffix = '', duration = 2000 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const hasStarted = useRef(false);

    useEffect(() => {
        if (!isInView || hasStarted.current) return;
        hasStarted.current = true;

        const startTime = performance.now();
        const startValue = 0;

        function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        }

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const currentValue = Math.round(startValue + (end - startValue) * easedProgress);

            setCount(currentValue);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }, [isInView, end, duration]);

    return (
        <span ref={ref}>
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
}
