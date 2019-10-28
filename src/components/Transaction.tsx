import { observer } from 'mobx-react-lite';
import { ITransaction } from '../store/Transaction';
import React from 'react';
import './transaction.css';
import { Icon } from './Icon';

interface IProps {
    transaction: ITransaction;
}

function Transaction({ transaction }: IProps) {
    return (
        <div className="transaction">
            <Icon name="calendar" />
            <span className="transaction-date">
                {transaction.date.getDay()} {months[transaction.date.getMonth()]}
            </span>
            <span className="transaction-description">{transaction.description}</span>
            <span style={{ flexGrow: 1 }} />
            <span className="balance">{transaction.value.toFixed(2)}</span>
        </div>
    );
}

export default observer(Transaction);

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
