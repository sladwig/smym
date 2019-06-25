import React from 'react';
import { IUser } from '../store/User';
import { observer } from 'mobx-react-lite';
import Transaction from './Transaction';

interface IProps {
    user: IUser;
    expand: boolean;
}

function User({ user, expand }: IProps) {
    const transactions = user.transactions.map((transaction, index) => {
        return <Transaction key={index} transaction={transaction} />;
    });
    return (
        <div>
            <div style={style}>
                <div style={userStyle}>
                    <img style={avatarStyle} src={user.avatar} />
                    {user.name} | {user.real_name} {user.balance.toFixed(2)}
                </div>

                {expand && <div>{transactions}</div>}
            </div>
        </div>
    );
}

export default observer(User);

const style = {
    width: '100%',
    minHeight: 90,
    border: '1px solid grey',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
};
const userStyle = {
    display: 'flex',
    flexDirection: 'row' as 'row',
};

const avatarStyle = {
    width: 48,
    height: 48,
    borderRadius: 24,
};
