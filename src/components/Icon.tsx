import React, { MouseEvent, CSSProperties } from 'react';
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
    size?: 'small' | 'tiny';
    noHover?: boolean;
    pointer?: boolean;
    onClick?: (event?: MouseEvent) => void;
    style?: CSSProperties;
}

export const Icon = ({
    name,
    transparent,
    turn,
    size,
    onClick,
    fill,
    style,
    noHover,
    pointer,
}: IProps) => {
    const SvgIcon = svgs[name];
    return (
        <div
            className={classnames('icon-wrapper', {
                'no-background': transparent && !size,
                'tiny-icon': size === 'tiny',
                'small-icon': size === 'small',
                'no-hover': noHover,
                pointer,
            })}
            style={style}
        >
            <SvgIcon
                onClick={onClick}
                className={classnames('icon', {
                    'turn-180': turn,
                })}
                style={{ fill, stroke: fill }}
            />
        </div>
    );
};
