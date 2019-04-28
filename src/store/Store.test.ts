import { Store } from './Store';
import { IUser } from './User';
import { getSnapshot } from 'mobx-state-tree';

it('can be created', () => {
    const store = Store.create({});
    expect(store).toMatchSnapshot();
});

it('can add user', () => {
    const store = Store.create();
    expect(store.users.size).toEqual(0);

    store.addUser({ id: 'def', name: 'mark' });
    expect(store.users.size).toEqual(1);

    const user = store.users.get('def');
    expect(user.name).toEqual('mark');
});

it('has a userList', () => {
    const store = Store.create();
    store.addUser({ id: 'def', name: 'mark' });
    expect(store.usersList).toMatchSnapshot();
    expect(store.usersList.length).toEqual(1);
});
