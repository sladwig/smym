import { observer } from 'mobx-react-lite';
import Transaction from './Transaction';
import { ITransaction } from '../store/Transaction';
import React from 'react';

interface IProps {
    transactions: ITransaction[];
}

export const TransactionList = observer(({ transactions }: IProps) => {
    const allTransactions = transactions.map((transaction, index) => {
        return <Transaction key={index} transaction={transaction} />;
    });

    return (
        <div style={{ marginTop: 36 }}>
            {transactions.length ? allTransactions : 'no transactions'}
        </div>
    );
});
