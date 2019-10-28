import React, { useState } from 'react';
import './App.css';
import { useLocalStoreBackedFormInput } from './hooks/useFormInput';
import { store } from './store/Store';
import { UserList } from './components/UserList';
import { observer } from 'mobx-react-lite';
import { useUpdatedUserList } from './hooks/useUpdatedUserList';
import { analyze } from './services/nlp';
import { inform } from './services/inform';
import TransactionInput from './components/TransactionInput';
import fuzzysearch from 'fuzzysearch';
import DevDetails from './components/DevDetails';

function App() {
    const [apiToken, setApiToken, ApiInput] = useLocalStoreBackedFormInput('apiToken', '');
    useUpdatedUserList(apiToken);
    const [shouldSlack, setShouldSlack] = useState(false);
    const [value, setValue] = useState('@stefanl');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const result = analyze(value);
    const hasUser = store.hasUser(result.value.name);

    const filteredUserList = [...store.usersList].filter(u =>
        fuzzysearch(result.value.name, `${u.name} ${u.real_name}`),
    );

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
                <div style={inputStyle}>
                    <TransactionInput onChange={onChange} value={value} />
                    {/* <input disabled={!(result.isComplete && hasUser)} type="submit" value="Go" /> */}
                </div>
            </form>
            {/* <TransactionForm {...result.value} /> */}
            <UserList users={filteredUserList} />
            {!apiToken && <ApiInput />}
            <DevDetails {...{ shouldSlack, setShouldSlack, hasUser, result }} />
        </div>
    );
}

const inputStyle = {
    height: 104,
    width: '100%',
    display: 'flex',
    flexDirection: 'row' as 'row',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 0.5px 0 0 rgba(0, 0, 0, 0.17)',
    backgroundColor: '#ffffff',
};

export default observer(App);
