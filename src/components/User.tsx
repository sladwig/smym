import React, { useState } from 'react';
import { IUser } from '../store/User';
import { observer } from 'mobx-react-lite';
import './user.css';
import { TransactionList } from './TranactionList';
import { Icon } from './Icon';
import { PaidButton, UnpaidButton } from './Button';

interface IProps {
    user: IUser;
    expand: boolean;
}
const transactionHeight = 96;

export const User = observer(({ user, expand }: IProps) => {
    const [showMore, setShowMore] = useState(expand);
    const height = showMore ? user.transactions.length * transactionHeight + 100 : 56;

    return (
        <div className="user-wrapper">
            <div className="user-area" style={{ height }}>
                <div className="user">
                    <div className="avatar-area">
                        <img className="avatar" src={user.avatar} />
                    </div>
                    <div className="description">
                        <b style={{ marginRight: 12 }}>{user.name}</b> |{' '}
                        <span style={{ marginLeft: 12 }}>{user.real_name}</span>
                    </div>
                    <div className="balance" style={{ marginRight: 26 }}>
                        {user.balance.toFixed(2)}
                    </div>
                    {user.balance === 0 ? <PaidButton /> : <UnpaidButton />}
                    <Icon
                        name="open"
                        transparent={true}
                        turn={showMore}
                        noHover={true}
                        style={{ marginLeft: 15 }}
                        onClick={() => setShowMore(() => !showMore)}
                    />
                </div>
                {showMore && <TransactionList transactions={user.transactions} />}
            </div>
        </div>
    );
});
