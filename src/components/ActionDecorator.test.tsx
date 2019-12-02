import { render } from '@testing-library/react';
import React from 'react';
import { ActionDecorator } from './ActionDecorator';

describe('ActionDecorator', () => {
    test('renders', () => {
        const { container } = render(<ActionDecorator />);
        expect(container).toMatchSnapshot();
    });
});
