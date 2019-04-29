import { slack } from './slack';
import { IUser } from '../store/User';

export const inform = (apiToken: string, user: IUser) => {
    slack(apiToken).sendUserMessage(user.id, `Your balance is ${user.balance.toFixed(2)}`);
};
