import React from 'react';
import { observer } from 'mobx-react-lite';

interface Props {
    result: any;
    hasUser: boolean;
    shouldSlack: boolean;
    setShouldSlack: (_: boolean) => any;
}

function DevDetails({ result, hasUser, shouldSlack, setShouldSlack }: Props) {
    return (
        <div style={style}>
            {JSON.stringify(result)}
            <div>has User: {JSON.stringify(hasUser)}</div>
            <div onClick={() => setShouldSlack(!shouldSlack)}>
                should slack {JSON.stringify(shouldSlack)}
            </div>
        </div>
    );
}

const style = {
    color: 'rgba(0, 0, 0, 0.3)',
};

export default observer(DevDetails);
