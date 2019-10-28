import React, { FunctionComponent, ReactNode } from 'react';
import './button.css';
import classnames from 'classnames';
import { Icon } from './Icon';

interface IProps {
    onClick?: (event: React.MouseEvent) => void;
    text?: string;
    className?: string;
    bg?: 'cornflower';
    noHover?: boolean;
    children?: ReactNode;
}
type Button = FunctionComponent<IProps>;

export const Button: FunctionComponent<IProps> = ({
    onClick = () => null,
    text = '',
    className = '',
    bg,
    children,
    noHover,
    ...rest
}: IProps) => (
    <div
        className={classnames('button', {
            'bg-cornflower': bg === 'cornflower',
            'no-hover': noHover,
        })}
        onClick={onClick}
        {...rest}
    >
        {children ? children : text}
    </div>
);

export const PaidButton: Button = (props: any) => (
    <Button bg="cornflower" noHover={true} {...props}>
        <Icon name="check" size="tiny" noHover={true} /> <span>&nbsp;Paid</span>
    </Button>
);
export const UnpaidButton: Button = (props: any) => <Button text="Mark Paid" {...props} />;
