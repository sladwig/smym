import React, { useState } from 'react';
import './App.css';
import { useLocalStoreBackedFormInput } from './hooks/useFormInput';
import { store } from './store/Store';
import { UserList } from './components/UserList';
import { observer } from 'mobx-react-lite';
import { useUpdatedUserList } from './hooks/useUpdatedUserList';
import { analyze } from './services/nlp';
import { inform } from './services/inform';
import fuzzysearch from 'fuzzysearch';
import DevDetails from './components/DevDetails';
import { TransactionInputArea, useInputStore, inputStore } from './components/TokenInput';

function App() {
    const [apiToken, setApiToken, ApiInput] = useLocalStoreBackedFormInput('apiToken', '');
    useUpdatedUserList(apiToken);
    const [shouldSlack, setShouldSlack] = useState(false);
    const value = useInputStore(s => s.value);

    const result = analyze(value);
    const hasUser = store.hasUser(result.value.name);

    const filteredUserList = [...store.usersList].filter(u =>
        fuzzysearch(result.value.name, `${u.name} ${u.real_name}`),
    );

    const createTransaction = (event?: React.FormEvent<HTMLFormElement>) => {
        if (event) event.preventDefault();

        if (result.value.name === undefined) return;

        const user = store.usersByName[result.value.name];
        user.addTransaction(result.value.value as number, result.value.description as string);
        inform(apiToken, user, shouldSlack);
        inputStore.getState().reset();
    };
    return (
        <div className="App">
            <TransactionInputArea />
            <UserList users={filteredUserList} />
            {!apiToken && <ApiInput />}
            <DevDetails {...{ shouldSlack, setShouldSlack, hasUser, result }} />
        </div>
    );
}

export default observer(App);
