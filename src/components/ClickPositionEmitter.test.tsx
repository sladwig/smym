import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { ClickPositionEmitter, PositionEmitter } from './ClickPositionEmitter';

describe('ClickPositionEmitter', () => {
    test('renders', () => {
        const { container } = render(<ClickPositionEmitter />);
        expect(container).toMatchSnapshot();
    });

    test('renders with value', () => {
        const { container } = render(<ClickPositionEmitter value="abc" />);
        expect(container).toMatchSnapshot();
    });

    test('is clickable and emits click position', () => {
        const mock = jest.fn();
        const { container } = render(<ClickPositionEmitter value={'ab'} onClick={mock} />);
        container.querySelectorAll('.position-area').forEach(area => {
            fireEvent.click(area);
        });
        expect(mock.mock.calls).toEqual([[0], [1], [1], [2]]);
    });

    test('can have a start position', () => {
        const mock = jest.fn();
        const { container } = render(
            <ClickPositionEmitter value={'ab'} onClick={mock} startPosition={3} />,
        );
        container.querySelectorAll('.position-area').forEach(area => {
            fireEvent.click(area);
        });
        expect(mock.mock.calls).toEqual([[3], [4], [4], [5]]);
    });
});

describe('PositionEmitter', () => {
    test('renders', () => {
        const { container } = render(<PositionEmitter value="a" />);
        expect(container).toMatchSnapshot();
    });

    test('is clickable and emits click position', () => {
        const mock = jest.fn();
        const { container } = render(<PositionEmitter value={'ab'} onClick={mock} />);
        container.querySelectorAll('.position-area').forEach(area => {
            fireEvent.click(area);
        });
        expect(mock.mock.calls).toEqual([[0], [1]]);
    });

    test('can set position', () => {
        const mock = jest.fn();
        const { container } = render(<PositionEmitter value={'ab'} onClick={mock} position={3} />);
        container.querySelectorAll('.position-area').forEach(area => {
            fireEvent.click(area);
        });
        expect(mock.mock.calls).toEqual([[3], [4]]);
    });
});
