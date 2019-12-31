import React, { useMemo, useEffect, useCallback } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { useSuggestionStore, suggestionStore } from '../../zustand/SuggestionStore';
import { hasCaret } from '../../utils/caret';
import { display } from './display';
import { CrossSvg } from '../Icon';
import { color as newColor } from '../../store/Place';
import { AnyCharacterT } from './types';

export const DescTokenDisplay = ({
    word,
}: {
    word: { characters: AnyCharacterT[]; value: string };
}) => {
    const bgColor = useMemo(() => newColor(), []);
    const { x, color, backgroundColor, fontWeight } = useSpring({
        from: { x: 0 },
        to: { x: 1, color: 'white', backgroundColor: bgColor, fontWeight: 500 },
        config: { ...config.stiff, clamp: true },
    });

    // maybe move this into a hook
    const reset = useSuggestionStore(state => state.reset);
    const isActive = hasCaret(word.characters);
    useEffect(() => {
        if (isActive) suggestionStore.setState({ mode: 'places', value: word.value });
        if (!isActive) reset();
        return () => reset();
    }, [isActive, reset, word.value]);

    const to = useCallback((output: number[]) => ({ range: [0, 1], output }), []);
    return (
        <animated.div
            className="description-token-display"
            style={{
                opacity: x.to(to([0.3, 1])),
                borderRadius: x.to(to([0, 32])),
                fontSize: x.to(to([36, 24])),
                paddingTop: x.to(to([0, 14])),
                paddingBottom: x.to(to([0, 14])),
                paddingLeft: x.to(to([0, 19])),
                paddingRight: x.to(to([0, 19])),
                color,
                backgroundColor,
                fontWeight,
            }}
        >
            <>{word.characters.map(display)}</>
            <span style={{ marginLeft: 20, fill: 'white' }}>
                <CrossSvg />
            </span>
        </animated.div>
    );
};
