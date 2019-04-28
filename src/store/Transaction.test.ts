import { Transaction } from './Transaction';

test('can be created', () => {
    const transaction = Transaction.create({ date: 1556447289344 });
    expect(transaction).toMatchSnapshot();
});
