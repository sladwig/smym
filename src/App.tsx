import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { useLocalStoreBackedFormInput } from './hooks/useFormInput';
import { store } from './store/Store';
import { UserList } from './components/UserList';
import { observer } from 'mobx-react-lite';
import { useUpdatedUserList } from './hooks/useUpdatedUserList';
import { analyze } from './services/nlp';
import { inform } from './services/inform';
import fuzzysearch from 'fuzzysearch';
import key, { KeyEvent, Callback } from 'keyboardjs';
import DevDetails from './components/DevDetails';
import { TransactionInputArea, useInputStore, inputStore } from './components/TokenInput';
import { suggestionStore } from './components/SuggestionBox';
import { AddToSlackOverlay } from './components/AddToSlackOverlay';

function App() {
    // TODO: use a simpler hook
    const [apiToken, setApiToken] = useLocalStoreBackedFormInput('apiToken', '');
    const createTransactionRef = useRef<() => void>(() => {});

    useEffect(() => {
        if (apiToken) return;
        const token = new URLSearchParams(window.location.search).get('apitoken');
        if (!token) return;
        setApiToken(token);
        window.history.pushState('', '', window.location.origin);
    }, [apiToken]);

    useEffect(() => {
        const create = ((e: KeyEvent) => {
            e.preventDefault();
            const { active } = suggestionStore.getState();
            if (0 <= active) return;

            createTransactionRef.current();
        }) as Callback;

        key.bind('enter', create);
        return () => key.unbind('enter', create);
    }, []);

    useUpdatedUserList(apiToken);
    const [shouldSlack, setShouldSlack] = useState(false);
    const value = useInputStore(s => s.value);

    const result = analyze(value);
    const hasUser = store.hasUser(result.value.name);

    const filteredUserList = [...store.usersList].filter(u =>
        fuzzysearch(result.value.name, `${u.name} ${u.real_name}`),
    );

    createTransactionRef.current = () => {
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
            <DevDetails {...{ shouldSlack, setShouldSlack, hasUser, result }} />
            {!apiToken && <AddToSlackOverlay />}
        </div>
    );
}

export default observer(App);
