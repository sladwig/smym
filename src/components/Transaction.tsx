import { ITransaction } from '../store/Transaction';
import React from 'react';
import './transaction.css';
import { Icon } from './Icon';
import randomcolor from 'randomcolor';

interface IProps {
    transaction: ITransaction;
}

export const Transaction = ({ transaction }: IProps) => {
    const backgroundColor = randomcolor({ hue: hues[Math.ceil(Math.random() * hues.length)] });
    return (
        <div className="transaction">
            <Icon name="calendar" noHover={true} />
            <span className="transaction-date">
                {transaction.date.getDay()} {months[transaction.date.getMonth()]}
            </span>
            {transaction.description && (
                <span className="transaction-description" style={{ backgroundColor }}>
                    {transaction.description}
                </span>
            )}
            <span style={{ flexGrow: 1 }} />
            <span className="balance">{transaction.value.toFixed(2)}</span>
        </div>
    );
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
const hues = ['melon', 'light-salmon', 'really-light-blue', 'bright-cyan'];
