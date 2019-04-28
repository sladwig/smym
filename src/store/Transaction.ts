import { types } from 'mobx-state-tree';

export const Transaction = types.model('Transaction', {
    date: types.optional(types.Date, () => new Date()),
    description: '',
    value: 0,
});

export type ITransaction = typeof Transaction.Type;
