import React from 'react';
import { display } from './display';
import { AnyCharacterT } from './types';

export const WordDisplay = ({ word }: { word: { characters: AnyCharacterT[] } }) => {
    return <>{word.characters.map(display)}</>;
};
