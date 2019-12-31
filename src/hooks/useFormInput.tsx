import React from 'react';
import { useStateInLocalStorage } from './useStateInLocalStorage';

export function useLocalStoreBackedFormInput(key: string, defaultValue: any) {
    const [value, setValue] = useStateInLocalStorage(key, defaultValue);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    const Input = () => <input type="text" value={value} onChange={onChange} />;
    return [value, setValue, Input];
}
