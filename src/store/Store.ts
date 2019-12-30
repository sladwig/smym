import { types, SnapshotOrInstance, Instance } from 'mobx-state-tree';
import { User, IUser } from './User';
import { createPersistenStore } from './createPersistenStore';
import { Place, color, IPlace } from './Place';

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
        get placesList(): IPlace[] {
            return Array.from(self.places.values());
        },
        get usersByName(): StringIndex<IUser> {
            const users: StringIndex<IUser> = {};
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

export interface IStore extends Instance<typeof Store> {}

export const store: IStore = createPersistenStore(Store, {}, 'stored');
