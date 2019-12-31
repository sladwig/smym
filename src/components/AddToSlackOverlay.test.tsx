import { render } from '@testing-library/react';
import React from 'react';
import { AddToSlackOverlay } from './AddToSlackOverlay';

describe('AddToSlackOverlay', () => {
    test('renders', () => {
        const { container } = render(<AddToSlackOverlay />);
        expect(container).toMatchSnapshot();
    });
});
