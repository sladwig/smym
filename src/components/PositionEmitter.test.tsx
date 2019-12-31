import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { PositionEmitter } from './PositionEmitter';

describe('PositionEmitter', () => {
    test('renders', () => {
        const { container } = render(<PositionEmitter value="a" />);
        expect(container).toMatchSnapshot();
    });

    test('is clickable and emits click position', () => {
        const mock = jest.fn();
        const onClick = (pos: number) => () => mock(pos);
        const { container } = render(<PositionEmitter value={'a'} onClick={onClick} />);
        container.querySelectorAll('.position-area').forEach(area => {
            fireEvent.click(area);
        });
        expect(mock.mock.calls).toEqual([[0], [1]]);
    });

    test('can set position', () => {
        const mock = jest.fn();
        const onClick = (pos: number) => () => mock(pos);
        const { container } = render(
            <PositionEmitter value={'ab'} onClick={onClick} position={3} />,
        );
        container.querySelectorAll('.position-area').forEach(area => {
            fireEvent.click(area);
        });
        expect(mock.mock.calls).toEqual([[3], [4]]);
    });
});
