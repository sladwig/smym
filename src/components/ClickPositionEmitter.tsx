import React from 'react';
import './ClickPositionEmitter.css';

interface IProps {
    value?: string;
    onClick?: (position: number) => any;
    startPosition?: number;
}

export const ClickPositionEmitter = ({
    value,
    onClick = (_: number) => null,
    startPosition = 0,
}: IProps) => {
    if (value === undefined) return null;
    const chars = value.split('').map((char, index) => {
        const position = startPosition + index;
        return (
            <PositionEmitter
                key={`char-${position}`}
                value={char}
                position={position}
                onClick={position => onClick(position)}
            />
        );
    });

    return <span className="click-position-emitter">{chars}</span>;
};

interface IPositionEmitterProps {
    value?: string;
    position?: number;
    onClick?: (position: number) => any;
}
export const PositionEmitter = ({
    value,
    position = 0,
    onClick = (_: number) => null,
}: IPositionEmitterProps) => {
    const sendPosition = (pos: number) => (event: React.MouseEvent) => {
        if (event && event.preventDefault) event.preventDefault();
        if (event && event.stopPropagation) event.stopPropagation();
        onClick(pos);
    };
    return (
        <span className="position-emitter">
            {value}
            <span className="position-area-overlay">
                <span className="position-area" onClick={sendPosition(position)}></span>
                <span className="position-area" onClick={sendPosition(position + 1)}></span>
            </span>
        </span>
    );
};
