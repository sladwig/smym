import React, { MouseEvent, useState } from 'react';
import './icon.css';
import classnames from 'classnames';

import { ReactComponent as calendarSvg } from '../images/calendar-icon.svg';
import { ReactComponent as checkSvg } from '../images/check-icon.svg';
import { ReactComponent as crossSvg } from '../images/cross-icon.svg';
import { ReactComponent as enterSvg } from '../images/enter-icon.svg';
import { ReactComponent as openSvg } from '../images/open-icon.svg';
import { ReactComponent as searchSvg } from '../images/search-icon.svg';

const svgs = {
    calendar: calendarSvg,
    check: checkSvg,
    cross: crossSvg,
    enter: enterSvg,
    open: openSvg,
    search: searchSvg,
};

interface IProps {
    name: 'calendar' | 'check' | 'cross' | 'enter' | 'open' | 'search';
    transparent?: boolean;
    fill?: string;
    turn?: boolean;
    deg?: number;
    size?: 'small' | 'tiny';
    onClick?: (event?: MouseEvent) => void;
}

export const Icon = ({ name, transparent, turn, size, onClick, fill, deg }: IProps) => {
    const SvgIcon = svgs[name];
    const transform = deg ? `rotate(${deg}deg)` : undefined;
    return (
        <div
            className={classnames('svg-wrapper', {
                'no-background': transparent,
                'tiny-icon': size === 'tiny',
                'small-icon': size === 'small',
            })}
        >
            <SvgIcon
                onClick={onClick}
                className={classnames('icon', {
                    'turn-180': turn,
                })}
                style={{ fill, stroke: fill, transform }}
            />
        </div>
    );
};

export const TurningIcon = ({ onClick, ...props }: IProps) => {
    const [counter, setCounter] = useState(0);
    const enhancedOnClick = (event?: MouseEvent) => {
        setCounter(() => counter + 1);
        if (onClick) onClick(event);
    };
    return <Icon {...props} onClick={enhancedOnClick} deg={counter * 180} />;
};
