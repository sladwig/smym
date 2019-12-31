import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import { useLocalStoreBackedFormInput } from './hooks/useFormInput';
import { store } from './store/Store';
import { UserList } from './components/UserList';
import { observer } from 'mobx-react-lite';
import { useUpdatedUserList } from './hooks/useUpdatedUserList';
import { analyze } from './services/nlp';
import { inform } from './services/inform';
import fuzzysearch from 'fuzzysearch';
import key, { Callback } from 'keyboardjs';
import DevDetails from './components/DevDetails';
import { TransactionInputArea, useInputStore, inputStore } from './components/TokenInput';
import { suggestionStore } from './components/SuggestionBox';
import { AddToSlackOverlay } from './components/AddToSlackOverlay';
import create from 'zustand';

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

    const create = useCallback(() => {
        const { active } = suggestionStore.getState();
        if (0 <= active) return;

        createTransactionRef.current();
    }, []) as Callback;
    useEffect(() => {
        key.bind('enter', create);
        return () => key.unbind('enter', create);
    }, [create]);

    useUpdatedUserList(apiToken);
    const [shouldSlack, setShouldSlack] = useState(true);
    const value = useInputStore(s => s.value);

    const result = analyze(value);

    const filteredUserList = [...store.usersList].filter(u =>
        fuzzysearch(result.value.name, `${u.name} ${u.real_name}`),
    );

    createTransactionRef.current = () => {
        if (!result.isComplete) return;

        const user = store.usersByName[result.value.name];
        user.addTransaction(result.value.value as number, result.value.description as string);
        inform(apiToken, user, shouldSlack);
        inputStore.getState().reset();
    };

    useEffect(() => {
        resultStore.setState({ isComplete: result.isComplete });
    }, [result.isComplete]);

    return (
        <div className="App">
            <TransactionInputArea create={create} />
            <UserList users={filteredUserList} />
            <DevDetails {...{ shouldSlack, setShouldSlack, result, hasUser: result.isComplete }} />
            {!apiToken && <AddToSlackOverlay />}
        </div>
    );
}

export default observer(App);

const initialValue = { isComplete: false };
const [useResultStore, resultStore] = create(set => ({
    ...initialValue,
    reset: () => set(initialValue),
}));
export { useResultStore, resultStore };
