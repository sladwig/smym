import React, { useState } from 'react';
import './App.css';
import { useLocalStoreBackedFormInput } from './hooks/useFormInput';
import { store } from './store/Store';
import UserList from './components/UserList';
import { observer } from 'mobx-react-lite';
import { useUpdatedUserList } from './hooks/useUpdatedUserList';
import { analyze } from './services/nlp';
import { inform } from './services/inform';
import TransactionInput from './components/TransactionInput';

function App() {
    const [apiToken, setApiToken, ApiInput] = useLocalStoreBackedFormInput('apiToken', '');
    useUpdatedUserList(apiToken);
    const [shouldSlack, setShouldSlack] = useState(false);
    const [value, setValue] = useState('');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const result = analyze(value);
    const hasUser = store.hasUser(result.value.name || '');

    const createTransaction = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (result.value.name === undefined) return;

        const user = store.usersByName[result.value.name];
        user.addTransaction(result.value.value as number, result.value.description as string);
        inform(apiToken, user, shouldSlack);
        setValue('');
    };
    return (
        <div className="App">
            <form onSubmit={createTransaction}>
                {!apiToken && <ApiInput />}
                <TransactionInput onChange={onChange} value={value} />
                <UserList users={store.usersList} />
                {JSON.stringify(result)}
                <div>has User: {JSON.stringify(hasUser)}</div>
                <input disabled={!(result.isComplete && hasUser)} type="submit" value="Go" />
            </form>
            <div onClick={() => setShouldSlack(!shouldSlack)}>
                should slack {JSON.stringify(shouldSlack)}
            </div>
        </div>
    );
}

export default observer(App);
