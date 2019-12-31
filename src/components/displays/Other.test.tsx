import { render } from '@testing-library/react';
import React from 'react';
import { Other } from './Other';

describe('Other', () => {
    test('renders', () => {
        const { container } = render(<Other />);
        expect(container).toMatchSnapshot();
    });
});
