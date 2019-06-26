import { observer } from 'mobx-react-lite';
import { ITransaction } from '../store/Transaction';
import React from 'react';
import { balanceStyle } from './User';

interface IProps {
    transaction: ITransaction;
}

function Transaction({ transaction }: IProps) {
    return (
        <div style={style}>
            <span style={dateStyle}>
                {transaction.date.getDay()} {months[transaction.date.getMonth()]}
            </span>
            <span style={descriptionStyle}>{transaction.description}</span>
            <span style={{ flexGrow: 1 }} />
            <span style={balanceStyle}>{transaction.value.toFixed(2)}</span>
        </div>
    );
}

export default observer(Transaction);

const style = {
    // height: ,
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row' as 'row',
    borderRadius: 4,
    border: 'solid 1px #dadada',
    padding: 23,
    alignItems: 'center',
};

const dateStyle = {
    width: 131,
};
const descriptionStyle = {
    opacity: 0.9,
    fontSize: 14,
    color: '#ffffff',
    padding: '8px 13px',

    textAlign: 'left' as 'left',
    borderRadius: 18,
    border: 'solid 1px #909090',
    backgroundColor: '#757575',
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
