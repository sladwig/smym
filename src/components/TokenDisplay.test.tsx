import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { TokenDisplay } from './TokenDisplay';
import { emitter } from '../hooks/useEvents';

describe('TokenDisplay', () => {
    test('renders', () => {
        const { container } = render(<TokenDisplay />);
        expect(container).toMatchSnapshot();
    });

    test('emits event input/focus onClick', () => {
        const cb = jest.fn();
        emitter.on('focus/input', cb);
        const { container } = render(<TokenDisplay />);

        fireEvent.click(container.firstChild as HTMLInputElement);
        expect(container).toMatchSnapshot();
    });
});
