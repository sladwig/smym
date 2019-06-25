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
    const height = (expand ? transactions.length * 25 : 0) + 50;
    return (
        <div style={{ ...style }}>
            <div style={{ ...userAreaStyle, height }}>
                <div style={{ ...userStyle }}>
                    <img style={avatarStyle} src={user.avatar} />
                    <div style={descriptionStyle}>
                        {user.name} | {user.real_name}
                    </div>
                    <div style={balanceStyle}>{user.balance.toFixed(2)}</div>
                </div>
                {expand && <div>{transactions}</div>}
            </div>
        </div>
    );
}

export default observer(User);

const style = {
    width: 720,
    border: '1px solid grey',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column' as 'column',
    transition: 'height 200ms ease-out',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
};
const userAreaStyle = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    width: '100%',
};
const userStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row' as 'row',
};
const descriptionStyle = {
    flexGrow: 1,
    textAlign: 'left' as 'left',
    verticalAlign: 'middle' as 'middle',
};
const balanceStyle = {
    flexGrow: 0,
};

const avatarStyle = {
    width: 48,
    height: 48,
    borderRadius: 24,
};
