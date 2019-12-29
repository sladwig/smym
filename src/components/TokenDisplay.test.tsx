import { render } from '@testing-library/react';
import React from 'react';
import { TokenDisplay } from './TokenDisplay';

describe('TokenDisplay', () => {
    test('renders', () => {
        const { container } = render(<TokenDisplay />);
        expect(container).toMatchSnapshot();
    });

    test.skip('reacts on value/update event', () => {
        const { container } = render(<TokenDisplay />);

        expect((container.firstChild as HTMLDivElement).innerHTML).toMatchSnapshot();
    });

    test('should not render anything when value is empty besides hidden caret', () => {
        const { container } = render(<TokenDisplay />);
        expect((container.firstChild as HTMLDivElement).innerHTML).toMatchSnapshot();
    });
});
