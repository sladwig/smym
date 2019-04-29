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
        addTransaction(value: number | 'reset', description: string) {
            if (value === 'reset') return this.resetTransactions();
            self.transactions.push({ value, description });
        },
        resetTransactions() {
            self.transactions.clear();
        },
        update(user: any) {
            self.name = user.name;
            self.real_name = user.real_name;
        },
    }))
    .views(self => ({
        get balance() {
            return self.transactions.reduce((sum, current) => sum + current.value, 0);
        },
    }));

export type IUser = Instance<typeof User>;
