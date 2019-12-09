import { types, SnapshotOrInstance, Instance } from 'mobx-state-tree';
import { User, IUser } from './User';
import { createPersistenStore } from './createPersistenStore';
import { Place, color } from './Place';

export const Store = types
    .model('Store', {
        users: types.map(User),
        places: types.map(Place),
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
        getColorFor(place: string) {
            if (self.places.has(place)) return self.places.get(place)!.color;
            self.places.put({ name: place, color: color() });
            return self.places.get(place)!.color;
        },
    }));

export type IStore = Instance<typeof Store>;

export const store = createPersistenStore(Store, {}, 'stored');
