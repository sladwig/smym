import React from 'react';
import './App.css';
import { useFormInput, useLocalStoreBackedFormInput } from './hooks/useFormInput';
import { slack } from './services/slack';
import { store } from './store/Store';
import UserList from './components/UserList';
import { observer } from 'mobx-react-lite';
import { useUpdatedUserList } from './hooks/useUpdatedUserList';

function App() {
    const [inputValue, setValue, FormInput] = useFormInput('');
    const [apiToken, setApiToken, ApiInput] = useLocalStoreBackedFormInput('apiToken', '');

    useUpdatedUserList(apiToken);

    return (
        <>
            <div className="App">
                <ApiInput />
                <FormInput />
                <UserList users={store.usersList} />
            </div>
        </>
    );
}

export default observer(App);
