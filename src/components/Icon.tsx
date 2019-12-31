import React, { MouseEvent, CSSProperties } from 'react';
import './icon.css';
import classnames from 'classnames';

import { ReactComponent as CalendarSvg } from '../images/calendar-icon.svg';
import { ReactComponent as CheckSvg } from '../images/check-icon.svg';
import { ReactComponent as CrossSvg } from '../images/cross-icon.svg';
import { ReactComponent as EnterSvg } from '../images/enter-icon.svg';
import { ReactComponent as OpenSvg } from '../images/open-icon.svg';
import { ReactComponent as SearchSvg } from '../images/search-icon.svg';
import { ReactComponent as CancelSvg } from '../images/cross-icon.svg';

export { CalendarSvg, CheckSvg, CrossSvg, EnterSvg, OpenSvg, SearchSvg, CancelSvg };

const svgs = {
    calendar: CalendarSvg,
    check: CheckSvg,
    cross: CrossSvg,
    enter: EnterSvg,
    open: OpenSvg,
    search: SearchSvg,
};

interface IProps {
    name: 'calendar' | 'check' | 'cross' | 'enter' | 'open' | 'search';
    transparent?: boolean;
    fill?: string;
    turn?: boolean;
    size?: 'small' | 'tiny';
    noHover?: boolean;
    pointer?: boolean;
    rectangle?: boolean;
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
    rectangle,
}: IProps) => {
    const SvgIcon = svgs[name];
    return (
        <span
            className={classnames('icon-wrapper', {
                'no-background': transparent && !size,
                'tiny-icon': size === 'tiny',
                'small-icon': size === 'small',
                'no-hover': noHover,
                pointer,
                rectangle,
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
        </span>
    );
};

export const SearchIcon = ({
    onClick,
}: {
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => any;
}) => (
    <div className="rectangle-icon-wrapper" {...{ onClick }}>
        <SearchSvg />
    </div>
);

export const CancelIcon = ({
    onClick,
    style,
}: {
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => any;
    style: CSSProperties;
}) => (
    <div className="rectangle-icon-wrapper" {...{ onClick, style }}>
        <CancelSvg />
    </div>
);

export const CheckIcon = ({
    onClick,
    style,
    classNames,
}: {
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => any;
    style: CSSProperties;
    classNames?: string;
}) => (
    <div className={classnames('rectangle-icon-wrapper', classNames)} {...{ onClick, style }}>
        <CheckSvg />
    </div>
);
