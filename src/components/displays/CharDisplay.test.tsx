import { render } from '@testing-library/react';
import React from 'react';
import { CharDisplay } from './CharDisplay';

describe('CharDisplay', () => {
    test('renders', () => {
        const { container } = render(<CharDisplay />);
        expect(container).toMatchSnapshot();
    });
});
