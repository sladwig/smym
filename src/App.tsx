import React from 'react';
import './App.css';
import { useFormInput, useLocalStoreBackedFormInput } from './hooks/useFormInput';

function App() {
    const [inputValue, setValue, FormInput] = useFormInput('');
    const [apiToken, setApiToken, ApiInput] = useLocalStoreBackedFormInput('apiToken', '');

    if (apiToken) {
        const { WebClient } = require('@slack/web-api');

        // Read a token from the environment variables
        const token = apiToken;

        // Initialize
        const web = new WebClient(token);
        (async () => {
            // Post a message to the channel, and await the result.
            // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
            // const result = await web.chat.postMessage({
            //     text: 'great :D',
            //     channel: 'DJA3BA079',
            // });
            // me "UJ28UC5EZ"  DJ4590BGF    ""DJA3BA079""
            // victorial UJ4F1LUP9"  "DJ2LT0SJU"    "DHWRLF0HY"
            // georgiap "UJ4M661PZ" "DHRCC8GSF"    DJ7MPHQQ4
            //  const result = await web.users.list({});
            //  const result = await web.conversations.open({
            //      users: 'UJ28UC5EZ',
            //  });
            // The result contains an identifier for the message, `ts`.
            // console.log(`Successfully send message ${result.ts} in conversation`);
            // console.log(result);
        })();
    }
    return (
        <>
            <div className="App">
                <ApiInput />
                <FormInput />
            </div>
        </>
    );
}

export default App;
