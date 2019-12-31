import { render } from '@testing-library/react';
import React from 'react';
import { TransactionInputArea } from './TransactionInputArea';

describe('TransactionInputArea', () => {
    test('renders', () => {
        const { container } = render(<TransactionInputArea />);
        expect(container).toMatchSnapshot();
    });
});
