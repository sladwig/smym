import React from 'react';
import { IUser } from '../../store/User';
import { Avatar } from '../User';
import classnames from 'classnames';

export const AtChar = ({ user, prev }: { user: IUser; prev: boolean }) => {
    return (
        <>
            {!user && <span className={classnames({ 'scale-in-center': prev !== !!user })}>@</span>}
            {user && (
                <span className={classnames({ 'scale-in-center': prev !== !!user })}>
                    <Avatar src={user.avatar} smaller={true} />
                </span>
            )}
        </>
    );
};
