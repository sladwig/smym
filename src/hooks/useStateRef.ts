import { MutableRefObject, useRef, useEffect } from 'react';

export function useStateRef<T>(state: T): MutableRefObject<T> {
    const ref = useRef(state);
    useEffect(() => {
        ref.current = state;
    }, [state]);
    return ref;
}
