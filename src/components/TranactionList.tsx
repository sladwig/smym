import { Transaction } from './Transaction';
import { ITransaction } from '../store/Transaction';
import React from 'react';

interface IProps {
    transactions: ITransaction[];
}

export const TransactionList = ({ transactions }: IProps) => {
    const allTransactions = transactions.map((transaction, index) => {
        return <Transaction key={index} transaction={transaction} />;
    });
    const noTransactions = (
        <div className="no-transactions" style={{ textAlign: 'center' }}>
            no transactions
        </div>
    );

    return (
        <div style={{ marginTop: 36 }}>
            {transactions.length ? allTransactions : noTransactions}
        </div>
    );
};
