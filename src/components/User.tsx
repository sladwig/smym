import React from 'react';
import { IUser } from '../store/User';
import { observer } from 'mobx-react-lite';

interface IProps {
    user: IUser;
}

function User({ user }: IProps) {
    return (
        <div>
            {user.name} {user.dmChannel}
            <br />
        </div>
    );
}

export default observer(User);
