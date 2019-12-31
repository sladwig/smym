import React from 'react';
import { PositionEmitter } from '../PositionEmitter';

export const CharDisplay = ({ char }: { char: { position: number; value: string } }) => {
    return <PositionEmitter position={char.position}>{char.value}</PositionEmitter>;
};
