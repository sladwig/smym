import React from 'react';
import { IUser } from '../store/User';
import { observer } from 'mobx-react-lite';
import Transaction from './Transaction';
import { Color } from '../style/colors';
import './user.css';

interface IProps {
    user: IUser;
    expand: boolean;
}

function User({ user, expand }: IProps) {
    const transactions = user.transactions.map((transaction, index) => {
        return <Transaction key={index} transaction={transaction} />;
    });
    const height = expand ? transactions.length * 88 + 108 : 56;
    return (
        <div className="mainUserArea">
            <div style={{ ...userAreaStyle, height }}>
                <div style={{ ...userStyle }}>
                    <div style={avatarAreaStyle}>
                        <img style={avatarStyle} src={user.avatar} />
                    </div>
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

const avatarAreaStyle = {
    position: 'relative' as 'relative',
    // left: -5,
    // top: -5,
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: 'white',
    marginRight: 26,
};
const avatarStyle = {
    position: 'absolute' as 'absolute',
    left: 5,
    top: 5,
    width: 56,
    height: 56,
    borderRadius: 28,
};
