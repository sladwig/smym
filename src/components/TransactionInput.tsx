import { observer } from 'mobx-react-lite';
import React, { ChangeEvent } from 'react';

interface IProp {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => any;
}
export const TransactionInput = ({ onChange, value }: IProp) => {
    return <input style={style} type="text" value={value} onChange={onChange} />;
};

const style = {
    width: 1116,
    fontSize: 36,
};
