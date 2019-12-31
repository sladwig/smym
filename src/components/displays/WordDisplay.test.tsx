import { render } from '@testing-library/react';
import React from 'react';
import { WordDisplay } from './WordDisplay';

describe('WordDisplay', () => {
    test('renders', () => {
        const { container } = render(<WordDisplay />);
        expect(container).toMatchSnapshot();
    });
});
