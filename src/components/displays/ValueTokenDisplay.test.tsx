import { render } from '@testing-library/react';
import React from 'react';
import { ValueTokenDisplay } from './ValueTokenDisplay';

describe('ValueTokenDisplay', () => {
    test('renders', () => {
        const { container } = render(<ValueTokenDisplay word={{ characters: [], value: '' }} />);
        expect(container).toMatchSnapshot();
    });
});
