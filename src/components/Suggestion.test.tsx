import { render } from '@testing-library/react';
import React from 'react';
import { Suggestion } from './Suggestion';

describe('Suggestion', () => {
    test('renders', () => {
        const { container } = render(<Suggestion />);
        expect(container).toMatchSnapshot();
    });
});
