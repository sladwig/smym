import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { TokenDisplay } from './TokenDisplay';
import { emitter } from '../hooks/useEvents';
import unbindAll from 'nanoevents/unbind-all';
import { valueUpdate, EP, Do } from '../actions';

const mockOn = (eventName: keyof EP) => {
    const callbackMock = jest.fn();
    emitter.on(eventName, callbackMock);
    return callbackMock;
};

afterAll(() => unbindAll(emitter));

describe('TokenDisplay', () => {
    test('renders', () => {
        const { container } = render(<TokenDisplay />);
        expect(container).toMatchSnapshot();
    });

    test('emits event input/focus onClick', () => {
        const cb = mockOn(Do.tokenInputFocusUpdate);
        const { container } = render(<TokenDisplay />);

        fireEvent.click(container.firstChild as HTMLInputElement);
        expect(cb).toHaveBeenCalledTimes(1);
    });

    test('reacts on value/update event', () => {
        const { container } = render(<TokenDisplay />);

        valueUpdate('oh');
        expect((container.firstChild as HTMLDivElement).innerHTML).toMatchSnapshot();
    });

    test('should not render anything when value is empty', () => {
        const { container } = render(<TokenDisplay />);
        expect((container.firstChild as HTMLDivElement).innerHTML).toBeEmpty();
    });

    test('should render caret on focus when value is empty', () => {
        const { container } = render(<TokenDisplay />);
        expect((container.firstChild as HTMLDivElement).innerHTML).toMatchSnapshot();
    });
});
