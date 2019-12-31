import { types } from 'mobx-state-tree';

export const Transaction = types.model('Transaction', {
    date: types.optional(types.Date, () => Date.now()),
    description: '',
    value: 0,
});

export type ITransaction = typeof Transaction.Type;
