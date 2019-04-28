import { WebClient } from '@slack/web-api';

export const slack = (apiToken: string) => ({
    web: new WebClient(apiToken),

    getUserList: async function() {
        return await this.web.users.list({});
    },

    getDmChannelFor: async function(userId: string) {
        return await this.web.conversations.open({ users: userId });
    },

    sendMessage: async function(text: string, channel: string) {
        return await this.web.chat.postMessage({
            text,
            channel,
        });
    },
});
