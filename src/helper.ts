import { RefObject } from 'react';

export function withCurrent<T>(ref: RefObject<T>, currenCall: (current: T) => any) {
    return () => {
        if (ref && ref.current) return currenCall(ref.current);
    };
}
