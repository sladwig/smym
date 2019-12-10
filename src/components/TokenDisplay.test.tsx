import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { TokenDisplay } from './TokenDisplay';
import unbindAll from 'nanoevents/unbind-all';

describe('TokenDisplay', () => {
    test('renders', () => {
        const { container } = render(<TokenDisplay />);
        expect(container).toMatchSnapshot();
    });

    test('emits event input/focus onClick', () => {
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
