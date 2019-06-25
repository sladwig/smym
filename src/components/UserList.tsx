import React from 'react';
import { IUser } from '../store/User';
import User from './User';
import { observer } from 'mobx-react-lite';

interface IProps {
    users: IUser[];
}
function UserList({ users }: IProps) {
    const onlyOne = users.length === 1;
    const userList = users.map(user => <User key={user.id} user={user} expand={onlyOne} />);

    return <div style={style}>{userList}</div>;
}

export default observer(UserList);

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
};
