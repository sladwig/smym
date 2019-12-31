import React from 'react';
import { PositionEmitter } from '../PositionEmitter';
import { CharCharacterT } from './types';

export const CharDisplay = ({ char }: { char: CharCharacterT }) => {
    return <PositionEmitter position={char.position}>{char.value}</PositionEmitter>;
};
