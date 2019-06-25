import { observer } from 'mobx-react-lite';
import { ITransaction } from '../store/Transaction';
import React from 'react';

interface IProps {
    transaction: ITransaction;
}

function Transaction({ transaction }: IProps) {
    return (
        <div style={style}>
            <span>{transaction.date.toDateString()}</span>
            <span>{transaction.description}</span>
            <span style={{ flexGrow: 1 }} />
            <span style={{ fontWeight: 'bold' }}>{transaction.value.toFixed(2)}</span>
        </div>
    );
}

export default observer(Transaction);

const style = {
    display: 'flex',
    flexDirection: 'row' as 'row',
};
