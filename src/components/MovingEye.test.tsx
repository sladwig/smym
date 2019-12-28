import { render } from '@testing-library/react';
import React from 'react';
import { MovingEye } from './MovingEye';

describe('MovingEye', () => {
    test('renders', () => {
        const { container } = render(<MovingEye />);
        expect(container).toMatchSnapshot();
    });
});
