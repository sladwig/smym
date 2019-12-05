import { useRef, useEffect } from 'react';

// from good ol' Dan, see https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback: () => any, delay: number | null) {
    const savedCallback = useRef(() => null);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => savedCallback.current();

        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
