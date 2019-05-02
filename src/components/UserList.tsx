import React from 'react';
import { IUser } from '../store/User';
import User from './User';
import { observer } from 'mobx-react-lite';

interface IProps {
    users: IUser[];
}
function UserList({ users }: IProps) {
    const userList = users.map(user => <User key={user.id} user={user} />);

    return <div style={style}>{userList}</div>;
}

export default observer(UserList);

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
};
