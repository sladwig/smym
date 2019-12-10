import { render } from '@testing-library/react';
import React from 'react';
import { SuggestionBox } from './SuggestionBox';

describe('SuggestionBox', () => {
    test('renders', () => {
        const { container } = render(<SuggestionBox />);
        expect(container).toMatchSnapshot();
    });
});
