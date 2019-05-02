import React from 'react';
import { IUser } from '../store/User';
import { observer } from 'mobx-react-lite';
import Transaction from './Transaction';

interface IProps {
    user: IUser;
}

function User({ user }: IProps) {
    const transactions = user.transactions.map((transaction, index) => {
        return <Transaction key={index} transaction={transaction} />;
    });
    return (
        <div style={style}>
            {user.name} {user.balance.toFixed(2)}
            {transactions}
            <img src={user.avatar} />
        </div>
    );
}

export default observer(User);

const style = {
    width: 150,
    height: 150,
    border: '1px solid grey',
    borderRadius: 4,
};
