import { useState } from 'react';
import { useStateInLocalStorage } from './useStateInLocalStorage';

export function useFormInput(defaultValue: any) {
    const [value, setValue] = useState(defaultValue);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    const Input = () => <input type="text" value={value} onChange={onChange} />;
    return [value, setValue, Input];
}

export function useLocalStoreBackedFormInput(key: string, defaultValue: any) {
    const [value, setValue] = useStateInLocalStorage(key, defaultValue);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    const Input = () => <input type="text" value={value} onChange={onChange} />;
    return [value, setValue, Input];
}
