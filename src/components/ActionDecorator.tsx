import React, { ReactElement } from 'react';
import './ActionDecorator.css';
import { Icon } from './Icon';
import { ReactComponent as CrossSvg } from '../images/cross-icon.svg';

interface IProps {
    children: ReactElement;
}

export const ActionDecorator = ({ children }: IProps) => {
    return (
        <span className="action-decorator">
            {children}
            {/* <Icon name="cross" /> */}
            <CrossSvg />
        </span>
    );
};
