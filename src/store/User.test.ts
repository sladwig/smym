import { User } from './User';

test('can be created', () => {
    const user = User.create({ id: 'abc' });
    expect(user).toMatchSnapshot();
});

test('setDmChannel', () => {
    const user = User.create({ id: 'abc' });
    user.setDmChannel('def');
    expect(user.dmChannel).toEqual('def');
});

test('addTransaction', () => {
    const user = User.create({ id: 'abc' });
    user.addTransaction(4, 'new transaction');

    expect(user.balance).toEqual(4);
    expect(user.transactions.length).toEqual(1);
});

test('addTransaction with negative value', () => {
    const user = User.create({ id: 'abc' });
    user.addTransaction(4, 'new transaction');
    user.addTransaction(-2, 'another transaction');

    expect(user.balance).toEqual(2);
    expect(user.transactions.length).toEqual(2);
});

test('addTransaction with floats', () => {
    const user = User.create({ id: 'abc' });
    user.addTransaction(4.33, 'new transaction');

    expect(user.balance).toEqual(4.33);
});

test('resetTransactions', () => {
    const user = User.create({ id: 'abc' });
    user.addTransaction(4, 'new transaction');
    user.addTransaction(4, 'another transaction');
    user.resetTransactions();

    expect(user.balance).toEqual(0);
    expect(user.transactions.length).toEqual(0);
});

// test('resetTransactions if value goes to 0', () => {
//     const user = User.create({ id: 'abc' });
//     user.addTransaction(-4, 'new transaction');
//     user.addTransaction(4, 'another transaction');

//     expect(user.balance).toEqual(0);
//     expect(user.transactions.length).toEqual(0);
// });
