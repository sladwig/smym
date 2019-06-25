import React from 'react';
import { IUser } from '../store/User';
import User from './User';
import { observer } from 'mobx-react-lite';
import './user-list.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
interface IProps {
    users: IUser[];
}
function UserList({ users }: IProps) {
    const onlyOne = users.length === 1;
    const userList = users.map(user => (
        <CSSTransition key={user.id} timeout={200} classNames="user">
            <User key={user.id} user={user} expand={onlyOne} />
        </CSSTransition>
    ));

    return (
        <div style={style}>
            <TransitionGroup>{userList}</TransitionGroup>
        </div>
    );
}

export default observer(UserList);

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
};
