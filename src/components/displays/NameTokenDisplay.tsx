import React from 'react';
import { TD, AnyCharacterT } from './types';
import { nameToken } from '../../services/tokens';
import { store } from '../../store/Store';
import { usePrevious } from '../../hooks/usePrevious';
import { display } from './display';
import { AtChar } from './AtChar';

export const NameTokenDisplay = ({
    word,
}: {
    word: { tokenized: { name: string }; characters: AnyCharacterT[] };
}) => {
    const token = word.tokenized;
    const userName = token.name;
    const user = store.usersByName[userName];
    const prev = usePrevious(!!user);

    return (
        <>
            {word.characters.map(char => {
                if (char.type === 'char' && char.value === '@') {
                    return <AtChar key="char-@" {...{ user, prev }} />;
                }
                return display(char);
            })}
        </>
    );
};
