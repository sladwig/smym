import { useEffect } from 'react';
import { slack } from '../services/slack';
import { store } from '../store/Store';

interface MemberResponse {
    id: string;
    is_bot: boolean;
    name: string;
    real_name: string;
    profile: {
        image_48: string;
    };
}

export function useUpdatedUserList(apiToken: string) {
    useEffect(() => {
        if (apiToken) {
            const slacking = slack(apiToken);
            slacking.getUserList().then(userList => {
                ((userList.members as Array<MemberResponse>) || [])
                    .filter(each => each.id !== 'USLACKBOT')
                    .filter(each => !each.is_bot)
                    .forEach(each => {
                        store.addUser({
                            id: each.id,
                            name: each.name,
                            real_name: each.real_name,
                            avatar: each.profile.image_48,
                        });
                    });
            });
        }
    }, [apiToken]);
}
