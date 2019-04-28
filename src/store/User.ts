import { types, Instance } from 'mobx-state-tree';
import { Transaction } from './Transaction';

export const User = types
    .model('User', {
        id: types.identifier,
        name: types.maybe(types.string),
        real_name: types.maybe(types.string),
        dmChannel: types.maybe(types.string),
        transactions: types.array(Transaction),
    })
    .actions(self => ({
        setDmChannel(channelId: string) {
            self.dmChannel = channelId;
        },
    }));

// export type IUser = typeof User.Type;
export type IUser = Instance<typeof User>;
