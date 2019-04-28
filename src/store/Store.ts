import { types, SnapshotOrInstance } from 'mobx-state-tree';
import { User, IUser } from './User';

export const Store = types
    .model('Store', {
        users: types.map(User),
    })
    .actions(self => ({
        addUser(user: SnapshotOrInstance<typeof User>) {
            self.users.put(user);
        },
    }))
    .views(self => ({
        get usersList(): IUser[] {
            return Array.from(self.users.values());
        },
        get usersByName() {
            const users: { [index: string]: IUser } = {};
            this.usersList.forEach(user => {
                if (user.name) users[user.name] = user;
            });
            return users;
        },
    }));

export const store = Store.create({});
