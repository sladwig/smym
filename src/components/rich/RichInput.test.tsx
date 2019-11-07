import { render } from '@testing-library/react';
import React from 'react';
import { RichInput } from './RichInput';

describe('RichInput', () => {
    test('renders', () => {
        const { container } = render(<RichInput />);
        expect(container).toMatchSnapshot();
    });
});
