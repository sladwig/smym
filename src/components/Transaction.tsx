import { observer } from 'mobx-react-lite';
import { ITransaction } from '../store/Transaction';
import React from 'react';

interface IProps {
    transaction: ITransaction;
}

function Transaction({ transaction }: IProps) {
    return (
        <div style={style}>
            {transaction.description} {transaction.value.toFixed(2)}
        </div>
    );
}

export default observer(Transaction);

const style = {};
