import { types, SnapshotOrInstance, Instance } from 'mobx-state-tree';
import { User, IUser } from './User';
import { createPersistenStore } from './createPersistenStore';

export const Store = types
    .model('Store', {
        users: types.map(User),
    })
    .actions(self => ({
        addUser(user: SnapshotOrInstance<typeof User>) {
            if (self.users.has(user.id)) {
                self.users.get(user.id)!.update(user);
            } else {
                self.users.put(user);
            }
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
    }))
    .actions(self => ({
        hasUser(userName: string): boolean {
            return !!self.usersByName[userName];
        },
    }));

export type IStore = Instance<typeof Store>;

export const store = createPersistenStore(Store, {}, 'stored');
