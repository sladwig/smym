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
    const height = expand ? transactions.length * 88 + 125 : 56;
    return (
        <div style={{ ...style }}>
            <div style={{ ...userAreaStyle, height }}>
                <div style={{ ...userStyle }}>
                    <img style={avatarStyle} src={user.avatar} />
                    <div style={descriptionStyle}>
                        <b style={{ marginRight: 12 }}>{user.name}</b> |{' '}
                        <span style={{ marginLeft: 12 }}>{user.real_name}</span>
                    </div>
                    <div style={balanceStyle}>{user.balance.toFixed(2)}</div>
                </div>
                {expand && (
                    <div style={{ marginTop: 36 }}>
                        {transactions.length ? transactions : 'no transactions'}
                    </div>
                )}
            </div>
        </div>
    );
}

export default observer(User);

const style = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    transition: 'height 200ms ease-out',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 19,

    width: 1116,
    borderRadius: 6,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.08)',
    backgroundColor: '#ffffff',
    marginBottom: 18,
};
const userAreaStyle = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    width: '100%',
};
const userStyle = {
    height: 56,
    flexShrink: 0,
    width: '100%',
    // height: 47,
    display: 'flex',
    flexDirection: 'row' as 'row',
    alignItems: 'center',
};
const descriptionStyle = {
    flexGrow: 1,
    textAlign: 'left' as 'left',
    verticalAlign: 'middle' as 'middle',
};
export const balanceStyle = {
    flexGrow: 0,
    fontSize: 28,
    fontWeight: 'bold' as 'bold',
    letterSpacing: -0.7,
    textAlign: 'right' as 'right',
    color: '#282b2f',
};

const avatarStyle = {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 25,
};
