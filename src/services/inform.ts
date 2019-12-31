import { slack } from './slack';
import { IUser } from '../store/User';

export const inform = (apiToken: string, user: IUser, shouldSlack: boolean) => {
    let message = '';
    if (user.transactions.length > 0) {
        const lastTransaction = user.transactions.slice(-1).pop()!;
        message = `added '${lastTransaction.description} ${lastTransaction.value.toFixed(
            2,
        )}' to your balance - new total: ${user.balance.toFixed(2)}`;
    } else {
        message = `Paid up! - Your balance is ${user.balance.toFixed(2)}`;
    }
    if (shouldSlack) slack(apiToken).sendUserMessage(user.id, message);
};
