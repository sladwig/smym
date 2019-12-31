import { render } from '@testing-library/react';
import React from 'react';
import { AtChar } from './AtChar';

describe('AtChar', () => {
    test('renders', () => {
        const { container } = render(<AtChar />);
        expect(container).toMatchSnapshot();
    });
});
