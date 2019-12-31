import React from 'react';
import { display } from './display';
import { WordT, EmptyWordT } from './types';

export const WordDisplay = ({ word }: { word: WordT | EmptyWordT }) => {
    return <>{word.characters.map(display)}</>;
};
