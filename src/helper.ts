import { RefObject } from 'react';

export function withCurrent<T>(ref: RefObject<T>, cb: (current: T) => any) {
    return () => {
        if (ref && ref.current) return cb(ref.current);
    };
}

export const random = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
