import React, { useCallback, CSSProperties, useMemo } from 'react';
import './WordPresenter.css';
import {
    Token,
    TokenType,
    descriptionToken,
    minusToken,
    nameToken,
    paidToken,
    valueToken,
} from '../services/tokens';
import { PositionEmitter } from './ClickPositionEmitter';
import { store } from '../store/Store';
import { Avatar } from './User';
import classnames from 'classnames';
import { usePrevious } from '../hooks/usePrevious';
import { IUser } from '../store/User';
import { ReactComponent as CrossSvg } from '../images/cross-icon.svg';
import { useSpring, animated, config, useTransition } from 'react-spring';
import { color as newColor } from '../store/Place';
import { Caret } from './Caret';

export type EmptyWordT = {
    type: 'emptyword';
    value: string;
    characters: AnyCharacterT[];
    position: number;
};
export type WordT<T = Token> = {
    type: 'word';
    value: string;
    characters: AnyCharacterT[];
    tokenized: T;
    position: number;
};
export type AnyWordT = EmptyWordT | WordT;

export type CharCharacterT = { type: 'char'; value: string; position: number };
export const isChar = (char: { type: string }): char is CharCharacterT => char.type === 'char';
export type WhiteCharacterT = { type: 'white'; value: ' '; position: number };
export type CaretCharacterT = { type: 'caret' };
export const isCaret = (char: { type: string }): char is CaretCharacterT => char.type === 'caret';

export type AnyCharacterT = CharCharacterT | WhiteCharacterT | CaretCharacterT;

interface IWordProps {
    word: AnyWordT;
}

export type displayable =
    | 'emptyword'
    | 'word'
    | 'white'
    | 'caret'
    | 'char'
    | TokenType.desc
    | TokenType.minus
    | TokenType.name
    | TokenType.paid
    | TokenType.value;

/// types above
// functions

export const WordPresenter = ({ word }: IWordProps) => {
    return display(word);
};
const isWord = (to: { type: displayable }): to is WordT => to.type === 'word';

const display = (toDisplay: { type: displayable }) => {
    const map = {
        emptyword: (word: EmptyWordT) => (
            <EmptyWordDisplay word={word} key={`emptyword-${word.position}`} />
        ),
        word: (word: WordT) => <WordDisplay word={word} key={`word-${word.position}`} />,
        white: (char: WhiteCharacterT) => <WhiteDisplay key={`white-${char.position}`} />,
        caret: (char: CaretCharacterT) => <Caret key={`caret`} />,
        char: (char: CharCharacterT) => (
            <CharDisplay char={char} key={`${char.type}-${char.position}`} />
        ),
        [TokenType.desc]: (word: WordT<descriptionToken>) => {
            if ('paid'.startsWith(word.value)) {
                return <PaidTokenDisplay word={word as any} key={`paid-${word.position}`} />;
            }
            return <DescTokenDisplay key={`desc-${word.position}`} word={word} />;
        },
        [TokenType.minus]: (word: WordT<minusToken>) => (
            <ValueTokenDisplay
                key={`value-${word.position}`}
                word={word}
                style={{ color: 'red' }}
            />
        ),
        [TokenType.name]: (word: WordT<nameToken>) => (
            <NameTokenDisplay key={`name-${word.position}`} word={word} />
        ),
        [TokenType.paid]: (word: WordT<paidToken>) => (
            <PaidTokenDisplay key={`paid-${word.position}`} word={word} />
        ),
        [TokenType.value]: (word: WordT<valueToken>) => (
            <ValueTokenDisplay key={`value-${word.position}`} word={word} />
        ),
    };
    const mapper = isWord(toDisplay) ? toDisplay.tokenized.type : toDisplay.type;
    const component = map[mapper] || ((a: any) => <NullDisplay />);
    return component(toDisplay as any);
};

const EmptyWordDisplay = ({ word }: { word: EmptyWordT }) => {
    return <>{word.characters.map(display)}</>;
};

const WordDisplay = ({ word }: { word: WordT }) => {
    return <>{word.characters.map(display)}</>;
};

const CharDisplay = ({ char }: { char: CharCharacterT }) => {
    return <PositionEmitter position={char.position}>{char.value}</PositionEmitter>;
};

const WhiteDisplay = () => <span>&nbsp;</span>;
const NullDisplay = () => null;

interface TD<T = Token> {
    word: WordT<T>;
}

const DescTokenDisplay = ({ word }: TD<descriptionToken>) => {
    const bgColor = useMemo(() => newColor(), []);
    const { x, color, backgroundColor, fontWeight } = useSpring({
        from: { x: 0 },
        to: { x: 1, color: 'white', backgroundColor: bgColor, fontWeight: 500 },
        config: { ...config.stiff, clamp: true },
    });

    const to = useCallback((output: number[]) => ({ range: [0, 1], output }), []);
    return (
        <animated.div
            className="description-token-display"
            style={{
                opacity: x.interpolate(to([0.3, 1])),
                borderRadius: x.interpolate(to([0, 32])),
                fontSize: x.interpolate(to([36, 24])),
                paddingTop: x.interpolate(to([0, 14])),
                paddingBottom: x.interpolate(to([0, 14])),
                paddingLeft: x.interpolate(to([0, 19])),
                paddingRight: x.interpolate(to([0, 19])),
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
const NameTokenDisplay = ({ word }: TD<nameToken>) => {
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

const AtChar = ({ user, prev }: { user: IUser; prev: boolean }) => {
    return (
        <>
            {!user && <span className={classnames({ 'scale-in-center': prev !== !!user })}>@</span>}
            {user && (
                <span className={classnames({ 'scale-in-center': prev !== !!user })}>
                    <Avatar src={user.avatar} smaller={true} />
                </span>
            )}
        </>
    );
};
const PaidTokenDisplay = ({ word }: TD<paidToken>) => {
    const state = word.value.length;
    const { x } = useSpring({
        from: { x: 1 },
        x: state,
        config: { ...config.stiff, clamp: true },
    });
    const to = useCallback((output: number[]) => ({ range: [1, 4], output }), []);

    return (
        <animated.div
            className="paid-token"
            style={{
                opacity: x.interpolate(to([0.3, 1])),
                borderRadius: x.interpolate(to([0, 32])),
                fontSize: x.interpolate(to([36, 24])),
                paddingTop: x.interpolate(to([0, 14])),
                paddingBottom: x.interpolate(to([0, 14])),
                paddingLeft: x.interpolate(to([0, 19])),
                paddingRight: x.interpolate(to([0, 19])),
            }}
        >
            <>{word.characters.map(display)}</>
            {state === 4 && (
                <span style={{ marginLeft: 15 }}>
                    <CrossSvg />
                </span>
            )}
        </animated.div>
    );
};

const transitionOptions = {
    initial: { transform: 'translateY(-40px)', opacity: 0 },
    enter: { transform: 'translateY(0)', opacity: 1 },
    trail: 24,
    duration: 50,
    unique: true,
    expires: 0,
    key: (item: { key: number }) => `fixed-${item.key}`,
};

const ValueTokenDisplay = ({
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

    const commaSplittedValues = word.value.split(/\,|\./);
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
