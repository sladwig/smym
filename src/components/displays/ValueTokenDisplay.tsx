import React, { CSSProperties, useCallback } from 'react';
import { valueToken, minusToken } from '../../services/tokens';
import { isChar, CharCharacterT, TD } from './types';
import { useTransition, animated } from 'react-spring';
import { display } from './display';

const transitionOptions = {
    initial: { transform: 'translateY(-40px)', opacity: 0 },
    enter: { transform: 'translateY(0)', opacity: 1 },
    trail: 24,
    duration: 50,
    unique: true,
    expires: 0,
    key: (item: { key: number }) => `fixed-${item.key}`,
};

export const ValueTokenDisplay = ({
    word,
    style,
}: TD<valueToken | minusToken> & { style?: CSSProperties }) => {
    const onlyChars = word.characters.filter(isChar);

    let firstPosition = onlyChars[0].position;
    let lastPosition = onlyChars[onlyChars.length - 1].position;

    const fixed: Array<CharCharacterT & { key: number }> = [
        { type: 'char', value: '.', position: lastPosition++, key: 0 },
        { type: 'char', value: '0', position: lastPosition++, key: 1 },
        { type: 'char', value: '0', position: lastPosition++, key: 2 },
    ];

    const commaSplittedValues = word.value.split(/,|\./);
    const fixRestPosition = 1 < commaSplittedValues.length ? commaSplittedValues[1].length + 1 : 0;

    const transitionEuro = useTransition(
        { type: 'char', value: '€', position: firstPosition, key: 4 } as CharCharacterT & {
            key: number;
        },
        transitionOptions,
    );

    const transition = useTransition(fixed.slice(fixRestPosition), {
        ...transitionOptions,
        enter: { transform: 'translateY(0)', opacity: 0.6 },
    });
    const toAnimatedDiv = useCallback(
        (style: {}, item: CharCharacterT & { key: number }) => (
            <animated.div key={`fix-${item.key}`} style={style}>
                {display(item)}
            </animated.div>
        ),
        [],
    );

    return (
        <div className="row-flex value-token" style={style}>
            {transitionEuro(toAnimatedDiv)}
            {word.characters.map(display)}
            {transition(toAnimatedDiv)}
        </div>
    );
};
