import { WebClient } from '@slack/web-api';
import { store } from '../store/Store';
import { IUser } from '../store/User';

interface ConversationsOpenResponse {
    ok: boolean;
    channel: {
        id: string;
    };
}

export const slack = (apiToken: string) => ({
    web: new WebClient(apiToken),

    getUserList: async function() {
        return await this.web.users.list({});
    },

    getDmChannelFor: async function(userId: string) {
        return await this.web.conversations
            .open({
                users: userId,
            })
            .then(response => {
                const user: IUser | undefined = store.users.get(userId);
                if (!user) return;

                user.setDmChannel((response as ConversationsOpenResponse).channel.id);
            });
    },

    sendMessage: async function(text: string, channel: string) {
        return await this.web.chat.postMessage({
            text,
            channel,
        });
    },

    sendUserMessage: async function(userId: string, text: string) {
        const user: IUser | undefined = store.users.get(userId);

        if (!user) return;
        if (!user.dmChannel) await this.getDmChannelFor(user.id);

        if (user.dmChannel) await this.sendMessage(text, user.dmChannel);
    },
});
