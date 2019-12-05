import React, { ReactElement } from 'react';
import './ActionDecorator.css';
import { ReactComponent as CrossSvg } from '../images/cross-icon.svg';

interface IProps {
    children: ReactElement;
    word: any;
}

export const ActionDecorator = ({ children }: IProps) => {
    return (
        <span className="action-decorator">
            {children}
            <CrossSvg />
        </span>
    );
};
