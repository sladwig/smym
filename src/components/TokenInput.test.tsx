import { TokenInput } from './TokenInput';
import { render } from '@testing-library/react';
import React, { ReactElement } from 'react';

const renderAndActOn = (el: ReactElement) => {
    const fromRender = render(el);
    const access = {
        tokenInput: fromRender.container.querySelector('.token-input') as HTMLDivElement,
        preDisplay: fromRender.container.querySelector('.pre-display') as HTMLDivElement,
        inputField: fromRender.container.querySelector('.input-field') as HTMLDivElement,
        postDisplay: fromRender.container.querySelector('.post-display') as HTMLDivElement,
        placeholderField: fromRender.container.querySelector('.pre-display') as HTMLDivElement,
    };
    return { ...fromRender, ...access };
};

describe('TokenInput', () => {
    test('renders', () => {
        const { container } = render(<TokenInput />);
        expect(container).toMatchSnapshot();
    });
});
