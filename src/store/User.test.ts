import { User } from './User';

test('can be created', () => {
    const user = User.create({ id: 'abc' });
    expect(user).toMatchSnapshot();
});
