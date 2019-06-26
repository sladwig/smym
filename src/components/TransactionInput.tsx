import { observer } from 'mobx-react-lite';
import React, { ChangeEvent } from 'react';

interface IProp {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => any;
}
function TransactionInput({ onChange, value }: IProp) {
    return <input style={style} type="text" value={value} onChange={onChange} />;
}

export default observer(TransactionInput);

const style = {
    width: 1116,
    fontSize: 36,
};
