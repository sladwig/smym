import React, { useRef, useState, RefObject, CSSProperties, useEffect, useMemo } from 'react';
import './TokenInput.css';
import classnames from 'classnames';
import { text } from '../services/texter';
import { observer } from 'mobx-react-lite';
import * as key from 'keyboardjs';
import { w } from '../testUtils';

const alphabet = w(
    'a b c d e f g h i j k l m n o p q r s t u v w x i z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z space 0 1 2 3 4 5 6 7 8 9 @ ~ ! @ # $ % ^ & * ( ) , + { } | : backslash < > ? , . / ` [ apostrophe ] ; - =',
);

type Transformer<T> = (_: T) => any;

interface IProps {
    value?: string;
    placeholder?: string;
    style?: CSSProperties;
    className?: string;
    autofocus?: boolean;
    transformer?: Transformer<any>[];
}
export const TokenInput = observer(
    ({ value, placeholder, style = {}, className, autofocus, transformer = [] }: IProps) => {
        const [hasFocus, setHasFocus] = useState(false);
        const focusing = () => setHasFocus(true);
        const blurring = () => setHasFocus(false);

        const cm = useMemo(() => text(value), [value]);

        const { splited, focus, caret } = cm;

        console.log('render', splited, focus, caret);
        const focusedRef = useRef(null);

        useEffect(
            withCurrent(focusedRef, (current: HTMLDivElement) => {
                // if (!current)
                if (!current.childNodes.length) {
                    current.focus();
                    return;
                }
                var range = document.createRange();
                var sel = window.getSelection();
                console.log(current.childNodes.length);
                range.setStart(current.childNodes[0], caret);
                range.collapse(true);
                if (!sel) return;
                sel.removeAllRanges();
                sel.addRange(range);
            }),
            [focus, caret],
        );

        const focusInput = withCurrent(focusedRef, current => current.focus());

        useEffect(() => {
            if (hasFocus) key.setContext('input');
            if (!hasFocus) key.setContext('global');
        }, [hasFocus]);

        const getPos = withCurrent(focusedRef, (current: HTMLDivElement) => {
            try {
                if (!document) return;
                const sel = document.getSelection();
                if (!sel) return;
                let _range = sel.getRangeAt(0);
                let range = _range.cloneRange();
                range.selectNodeContents(current);
                range.setEnd(_range.endContainer, _range.endOffset);
                return range.toString().length;
            } catch (e) {
                console.log('error in get Pos:', e);
            }
        });

        const onUpdatePosition = (event?: key.KeyEvent) => {
            if (event && event.preventRepeat) event.preventRepeat();

            const readPosition = getPos();
            if (cm.caret !== readPosition) {
                cm.setCaret(readPosition);
            } else {
                if (event && event.type !== 'keyup') return;

                if (cm.isFirst) return cm.jump(-1);
                if (cm.isLast) return cm.jump(1);
            }
        };

        const onChange = withCurrent(focusedRef, (current: HTMLDivElement) => {
            const content = current.innerHTML.replace('&nbsp;', ' ');
            cm.update(content);
        });
        const onArrowLeft = () => {
            cm.move(-1);
        };
        const onArrowRight = () => {
            cm.move(+1);
        };
        const onBackspace = () => {
            cm.delete();
        };
        const nothing = () => null;
        useEffect(() => {
            key.withContext('input', () => {
                key.bind(alphabet, nothing, onChange);
                key.bind('left', nothing, onArrowLeft);
                key.bind('right', nothing, onArrowRight);
                key.bind('backspace', nothing, onBackspace);

                key.bind(['alt+left', 'alt+right'], onUpdatePosition, onUpdatePosition);
            });
        }, []);

        const inputs = splited.map((eachValue, index) => {
            if (index === focus) {
                // const thisRef = refs[index];

                return (
                    <div
                        key={`input-field-${index}`}
                        ref={focusedRef}
                        tabIndex={0}
                        className="input-field"
                        contentEditable={true}
                        onFocus={focusing}
                        onBlur={blurring}
                        spellCheck={false}
                        dangerouslySetInnerHTML={{ __html: eachValue }}
                    />
                );
            } else {
                return (
                    <div
                        className="display"
                        key={`display-${index}`}
                        onClick={() => cm.setFocus(index)}
                    >
                        {eachValue}
                    </div>
                );
            }
        });

        useEffect(() => {
            const readPosition = getPos();
            if (cm.position !== readPosition) {
                console.log('reset  positio', readPosition);
                cm.setCaret(readPosition);
            }
        });

        return (
            <div
                {...{
                    onClick: focusInput,
                    style,
                    className: classnames('token-input', className),
                }}
            >
                {inputs}
            </div>
        );
    },
);

const withCurrent = (
    ref: RefObject<HTMLDivElement>,
    currenCall: (current: HTMLDivElement) => any,
) => () => {
    if (ref.current) return currenCall(ref.current);
};

function withTransformer<T>(transformer: Transformer<T>[], values: T[]): any[] {
    return values.map(value =>
        transformer.reduce((result, transformer) => transformer(result), value),
    );
}
