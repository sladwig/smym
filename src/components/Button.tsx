import React, { FunctionComponent, ReactElement, ReactNode } from 'react';
import './button.css';
import classnames from 'classnames';
import { Icon } from './Icon';

interface IProps {
    onClick?: (event: React.MouseEvent) => void;
    text?: string;
    className?: string;
    bg?: 'cornflower';
    children?: ReactNode;
    color?: string;
}
type Button = FunctionComponent<IProps>;

export const Button: FunctionComponent<IProps> = ({
    onClick = () => null,
    text = '',
    className = '',
    bg,
    children,
    color,
    ...rest
}: IProps) => (
    <div
        className={classnames('button', { 'bg-cornflower': bg === 'cornflower' })}
        style={{ color, fill: color }}
        onClick={onClick}
        {...rest}
    >
        {children ? children : text}
    </div>
);

export const PaidButton: Button = (props: any) => (
    <Button bg="cornflower" color="white" {...props}>
        <Icon name="check" size="tiny" /> <span style={{ color: 'white' }}>&nbsp;Paid</span>
    </Button>
);
export const UnpaidButton: Button = (props: any) => <Button text="Mark Paid" {...props} />;
