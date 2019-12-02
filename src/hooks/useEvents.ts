import NanoEvents from 'nanoevents';
import { useEffect, useMemo } from 'react';

export type Events = {
    foo: string;
    bar: [string, string];
    'focus/input': null;
};

export const emitter = new NanoEvents<Events>();

export const useEventEmitter = (): {
    on: typeof emitter.on;
    emit: typeof emitter.emit;
    emitter: typeof emitter;
} => {
    return useMemo(
        () => ({
            on: emitter.on.bind(emitter),
            emit: emitter.emit.bind(emitter),
            emitter,
        }),
        [],
    );
};

export function useOn<EventName extends keyof Events>(
    eventName: EventName,
    cb: (args: Events[EventName]) => any,
) {
    const { on } = useEventEmitter();
    useEffect(() => on(eventName, cb), [eventName, cb, on]);
}

export const useEmit = () => useEventEmitter().emit;
