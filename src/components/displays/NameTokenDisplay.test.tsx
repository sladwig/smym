import { render } from '@testing-library/react';
import React from 'react';
import { NameTokenDisplay } from './NameTokenDisplay';

describe('NameTokenDisplay', () => {
    test('renders', () => {
        const { container } = render(
            <NameTokenDisplay word={{ tokenized: { name: '' }, characters: [] }} />,
        );
        expect(container).toMatchSnapshot();
    });
});
