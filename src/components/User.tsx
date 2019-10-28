import React, { useState, useEffect } from 'react';
import { IUser } from '../store/User';
import './user.css';
import { TransactionList } from './TranactionList';
import { Icon } from './Icon';
import { PaidButton, UnpaidButton } from './Button';

interface IProps {
    user: IUser;
    expand: boolean;
}
const transactionHeight = 102;

export const User = ({ user, expand }: IProps) => {
    const [showMore, setShowMore] = useState(expand);
    useEffect(() => setShowMore(expand), [expand]);

    const height = showMore ? (user.transactions.length || 1) * transactionHeight + 91 : 56;

    const toggleShowMore = () => setShowMore(() => !showMore);
    return (
        <div className="user-wrapper">
            <div className="user-area" style={{ height }}>
                <div className="user">
                    <div className="avatar-area" onClick={toggleShowMore}>
                        <img className="avatar" src={user.avatar} />
                    </div>
                    <div className="description" onClick={toggleShowMore}>
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
                        pointer={true}
                        style={{ marginLeft: 15 }}
                        onClick={toggleShowMore}
                    />
                </div>
                {showMore && <TransactionList transactions={user.transactions} />}
            </div>
        </div>
    );
};
