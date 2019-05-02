import { slack } from './slack';
import { IUser } from '../store/User';

export const inform = (apiToken: string, user: IUser) => {
    let message = '';
    if (user.transactions.length > 0) {
        const lastTransaction = user.transactions.slice(-1).pop()!;
        message = `${lastTransaction.description} ${lastTransaction.value.toFixed(
            2
        )} - New total: ${user.balance.toFixed(2)}`;
    } else {
        message = `Your balance is ${user.balance.toFixed(2)}`;
    }
    console.log(message);
    // slack(apiToken).sendUserMessage(user.id, message);
};
