import { render } from '@testing-library/react';
import React from 'react';
import { WordPresenter } from './WordPresenter';

describe('WordPresenter', () => {
    test('renders', () => {
        const { container } = render(<WordPresenter />);
        expect(container).toMatchSnapshot();
    });
});
