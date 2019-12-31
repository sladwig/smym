import React from 'react';
import { IUser } from '../store/User';
import { User } from './User';
import './UserList.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
interface IProps {
    users: IUser[];
}
export const UserList = ({ users }: IProps) => {
    const onlyOne = users.length === 1;
    const userList = users.map(user => (
        <CSSTransition key={user.id} timeout={200} classNames="user">
            <User user={user} expand={onlyOne} />
        </CSSTransition>
    ));

    return (
        <div className="user-list">
            <TransitionGroup component={null}>{userList}</TransitionGroup>
        </div>
    );
};
