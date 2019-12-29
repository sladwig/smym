import { render } from '@testing-library/react';
import React from 'react';
import { Caret } from './Caret';

describe('Caret', () => {
    test('renders', () => {
        const { container } = render(<Caret />);
        expect(container).toMatchSnapshot();
    });
});
