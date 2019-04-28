import React from 'react';
import { IUser } from '../store/User';
import { observer } from 'mobx-react-lite';

interface IProps {
    user: IUser;
}

function User({ user }: IProps) {
    return <>{user.name}</>;
}

export default observer(User);
