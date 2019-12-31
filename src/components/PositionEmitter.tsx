import React, { ReactNode } from 'react';
import './PositionEmitter.css';
import { inputStore } from '../zustand/InputStore';

interface IPositionEmitterProps {
    position?: number;
    value?: string;
    children?: ReactNode;
    onClick?: (position: number) => () => any;
}
export const PositionEmitter = ({
    children,
    position = 0,
    value = '',
    onClick = updatePosition,
}: IPositionEmitterProps) => {
    return (
        <span className="position-emitter">
            {children ? children : value}
            <span className="position-area-overlay">
                <span className="position-area" onClick={onClick(position)}></span>
                <span className="position-area" onClick={onClick(position + 1)}></span>
            </span>
        </span>
    );
};

const updatePosition = (position: number) => () =>
    inputStore.setState({ position, external: true });
