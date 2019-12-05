import { RefObject } from 'react';

export function withCurrent<T>(ref: RefObject<T>, cb: (current: T) => any) {
    return () => {
        if (ref && ref.current) return cb(ref.current);
    };
}
