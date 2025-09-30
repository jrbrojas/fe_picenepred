import { useEffect, useState } from 'react';

export default function useIsLargeScreen() {
    const [isLarge, setIsLarge] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 1024px)'); // Tailwind's lg breakpoint
        const handler = () => setIsLarge(mediaQuery.matches);

        handler(); // Check initially
        mediaQuery.addEventListener('change', handler);

        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return isLarge;
}
