import { render } from '@testing-library/react';
import React from 'react';
import { PaidTokenDisplay } from './PaidTokenDisplay';

describe('PaidTokenDisplay', () => {
    test('renders', () => {
        const { container } = render(<PaidTokenDisplay />);
        expect(container).toMatchSnapshot();
    });
});
