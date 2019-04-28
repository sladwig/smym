import { useEffect } from 'react';
import { slack } from '../services/slack';
import { store } from '../store/Store';

interface MemberResponse {
    id: string;
    is_bot: boolean;
    name: string;
    real_name: string;
}

export function useUpdatedUserList(apiToken: string) {
    useEffect(() => {
        if (apiToken) {
            const slacking = slack(apiToken);
            slacking.getUserList().then(userList => {
                console.log(userList);
                ((userList.members as Array<MemberResponse>) || [])
                    .filter(each => each.id !== 'USLACKBOT')
                    .filter(each => !each.is_bot)
                    .forEach(each => {
                        console.log('each', each);
                        store.addUser({
                            id: each.id,
                            name: each.name,
                            real_name: each.real_name,
                        });
                    });
            });
        }
    }, [apiToken]);
}
