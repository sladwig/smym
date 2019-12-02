import { renderHook } from '@testing-library/react-hooks';
import { useEventEmitter, useEmit, useOn } from './useEvents';

describe('useEventEmitter', () => {
    test('returns same functions', () => {
        const { result, rerender } = renderHook(() => useEventEmitter());
        const { on, emit } = result.current;
        rerender(() => useEventEmitter());

        expect(on).toBe(result.current.on);
        expect(emit).toBe(result.current.emit);
    });
});

describe('useEmit', () => {
    test('returns same emitter', () => {
        const { result, rerender } = renderHook(() => useEmit());
        const emit = result.current;
        rerender(() => useEventEmitter());

        expect(emit).toBe(result.current);
    });
});

test('useOn with useEmit', () => {
    const callback = jest.fn();
    renderHook(() => useOn('foo', callback));
    const { result } = renderHook(() => useEmit());

    const emit = result.current;
    emit('foo', '123');

    expect(callback).toHaveBeenCalledWith('123');
});
