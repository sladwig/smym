import React, { ChangeEvent, useState, FormEvent, useRef, useEffect, CSSProperties } from 'react';
import './transactionInput.css';
import classnames from 'classnames';
import { ReactComponent as SearchIconSvg } from '../images/search-icon.svg';
import { ReactComponent as CancelSvg } from '../images/cross-icon.svg';
import { ReactComponent as CheckSvg } from '../images/check-icon.svg';

interface IProp {
    value: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => any;
    onSubmit?: (event?: FormEvent<HTMLFormElement>) => any;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
}

const moveCursorToPosition = (el: Element, position: number) => {
    const selection = document.getSelection();
    const range = document.createRange();
    try {
        range.setStart(el, position);
    } catch {
        range.setStart(el, el.childNodes.length);
    }

    selection && selection.removeAllRanges();
    selection && selection.addRange(range);
};
const moveCursorToTheEnd = (el: Element) => {
    moveCursorToPosition(el, el.childNodes.length);
};

export const TransactionInput = ({ onChange, onSubmit, value, setValue }: IProp) => {
    const [active, setActive] = useState(true);
    const [inputValue, setInputValue] = useState('@stefa lo');
    const inputRef = useRef<HTMLInputElement>(null);
    const displayRef = useRef<HTMLDivElement>(null);
    const postRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (active && document.activeElement !== inputRef.current) focusInput();
    }, [active, inputValue]);

    const focusInput = () => {
        if (!inputRef.current) return;
        inputRef.current.focus();
        moveCursorToTheEnd(inputRef.current);
    };

    const onInputFocus = () => {
        // focusInput();
    };
    const preventEnter = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') event.preventDefault();
    };
    const onInputKeyUp = (event: React.KeyboardEvent) => {
        if (!inputRef.current) return;
        if (!event) return;
        console.log(displayRef.current!.childNodes);

        if (event.key === 'Backspace' && !inputRef.current.textContent) {
            const [last, ...rest] = inputValue.split(' ').reverse();
            const restString = rest.reverse().join(' ');
            console.log('splits', restString, 'last', last);
            setInputValue(restString);
            inputRef!.current!.textContent = last || null;

            moveCursorToTheEnd(inputRef.current);
        }

        if (!inputRef.current.textContent) return;

        if ([' ', 'Enter'].includes(event.key)) {
            if (!inputRef) return;
            if (!inputRef.current) return;
            setInputValue(`${inputValue} ${inputRef!.current!.textContent!}`);
            inputRef.current.textContent = null;
        }

        if (event.key === 'Enter') {
            // onSubmit();
            if (onSubmit) onSubmit();
            console.log('enter pressed');
            return false;
        }
        if (event.key.includes('Arrow')) {
            console.log('position');
        }
    };
    const onInputChange = (event: React.KeyboardEvent) => {
        console.log('onInputChange', event);
    };

    return (
        <form onSubmit={onSubmit}>
            <div
                className={classnames('transaction-input-area', 'heading-1', { active })}
                onClick={focusInput}
            >
                {!active && (
                    <>
                        <SearchIcon onClick={() => setActive(true)} />
                    </>
                )}
                {active && (
                    <>
                        <SearchIconSvg style={{ marginRight: 29 }} />
                        <div ref={displayRef} className="tranaction-display" style={{}}>
                            {inputValue}
                        </div>
                        &nbsp;
                        <div
                            tabIndex={0}
                            onClick={focusInput}
                            style={{ border: '1px solid red', textAlign: 'left' }}
                            key="editable"
                            contentEditable={true}
                            ref={inputRef}
                            className="transaction-input"
                            onKeyDown={preventEnter}
                            onKeyUp={onInputKeyUp}
                            onFocus={onInputFocus}
                            spellCheck={false}
                            placeholder={'Type here'}
                        />
                        <div ref={displayRef} className="tranaction-postdisplay"></div>
                        <CancelIcon onClick={() => setActive(false)} style={{ marginLeft: 29 }} />
                    </>
                )}
            </div>
        </form>
    );
};

export const SearchIcon = ({
    onClick,
}: {
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => any;
}) => (
    <div className="rectangle-icon-wrapper" {...{ onClick }}>
        <SearchIconSvg />
    </div>
);
export const CancelIcon = ({
    onClick,
    style,
}: {
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => any;
    style: CSSProperties;
}) => (
    <div className="rectangle-icon-wrapper" {...{ onClick, style }}>
        <CancelSvg />
    </div>
);
export const CheckIcon = ({
    onClick,
    style,
    classNames,
}: {
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => any;
    style: CSSProperties;
    classNames?: string;
}) => (
    <div className={classnames('rectangle-icon-wrapper', classNames)} {...{ onClick, style }}>
        <CheckSvg />
    </div>
);
