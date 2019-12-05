import React, { ReactNode } from 'react';
import './ClickPositionEmitter.css';
import { setState } from './TokenInput';

interface IPositionEmitterProps {
    position?: number;
    children: ReactNode;
}
export const PositionEmitter = ({ children, position = 0 }: IPositionEmitterProps) => {
    return (
        <span className="position-emitter">
            {children}
            <span className="position-area-overlay">
                <span className="position-area" onClick={updatePosition(position)}></span>
                <span className="position-area" onClick={updatePosition(position + 1)}></span>
            </span>
        </span>
    );
};

const updatePosition = (position: number) => () => setState({ position, external: true });
