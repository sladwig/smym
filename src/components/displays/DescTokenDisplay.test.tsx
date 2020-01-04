import { render } from '@testing-library/react';
import React from 'react';
import { DescTokenDisplay } from './DescTokenDisplay';

describe('DescTokenDisplay', () => {
    test('renders', () => {
        const { container } = render(<DescTokenDisplay word={{ value: '', characters: [] }} />);
        expect(container).toMatchSnapshot();
    });
});
