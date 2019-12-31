import React from 'react';
import './Presenter.css';
import { AnyWordT } from './displays/types';
import { display } from './displays/display';

interface IWordProps {
    word: AnyWordT;
}

export const Presenter = ({ word }: IWordProps) => {
    return display(word);
};
