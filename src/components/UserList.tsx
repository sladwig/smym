import React from 'react';
import { IUser } from '../store/User';
import User from './User';
import { observer } from 'mobx-react-lite';

interface IProps {
    users: IUser[];
}
function UserList({ users }: IProps) {
    const userList = users.map(user => <User user={user} />);
    return <>{userList}</>;
}

export default observer(UserList);
