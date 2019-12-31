import { TokenInput } from './TokenInput';
import { render, fireEvent } from '@testing-library/react';
import React, { ReactElement } from 'react';
import user from '@testing-library/user-event';
import { dispatch } from '../testUtils';

const renderAndActOn = (el: ReactElement) => {
    const fromRender = render(el);
    const access = {
        tokenInput: fromRender.container.querySelector('.token-input') as HTMLDivElement,
        preDisplay: fromRender.container.querySelector('.pre-display') as HTMLDivElement,
        inputField: fromRender.container.querySelector('.input-field') as HTMLDivElement,
        postDisplay: fromRender.container.querySelector('.post-display') as HTMLDivElement,
        placeholderField: fromRender.container.querySelector('.pre-display') as HTMLDivElement,
    };
    return { ...fromRender, ...access };
};

describe('TokenInput', () => {
    test('renders', () => {
        const { container } = render(<TokenInput />);
        expect(container).toMatchSnapshot();
    });

    test.skip('can set value', () => {
        const value = 'abc def';
        const { preDisplay } = renderAndActOn(<TokenInput value={value} />);
        expect(preDisplay.innerHTML).toEqual(value);
    });

    // describe('placeholder', () => {
    //     test('can set placeholder', () => {
    //         const placeholder = 'abc def';
    //         const { preDisplay } = renderAndActOn(<TokenInput {...{ placeholder }} />);
    //         expect(preDisplay.innerHTML).toEqual(placeholder);
    //     });

    //     describe('removes placeholder onFocus', () => {
    //         test('input field', () => {
    //             const placeholder = 'abc def';
    //             const { inputField, placeholderField } = renderAndActOn(
    //                 <TokenInput {...{ placeholder }} />,
    //             );
    //             user.click(inputField);
    //             expect(inputField.innerHTML).toEqual('');
    //             expect(placeholderField.innerHTML).toEqual('');
    //         });
    //         test('pre display', () => {
    //             const placeholder = 'abc def';
    //             const { preDisplay, placeholderField } = renderAndActOn(
    //                 <TokenInput {...{ placeholder }} />,
    //             );
    //             user.click(preDisplay);
    //             expect(preDisplay.innerHTML).toEqual('');
    //             expect(placeholderField.innerHTML).toEqual('');
    //         });
    //         test('post display', () => {
    //             const placeholder = 'abc def';
    //             const { postDisplay, placeholderField } = renderAndActOn(
    //                 <TokenInput {...{ placeholder }} />,
    //             );
    //             user.click(postDisplay);
    //             expect(postDisplay.innerHTML).toEqual('');
    //             expect(placeholderField.innerHTML).toEqual('');
    //         });

    //         test('token input', () => {
    //             const placeholder = 'abc def';
    //             const { tokenInput, placeholderField } = renderAndActOn(
    //                 <TokenInput {...{ placeholder }} />,
    //             );
    //             user.click(tokenInput);
    //             expect(placeholderField.innerHTML).toEqual('');
    //         });
    //     });
    // });

    // describe('can focus on click', () => {
    //     test('input field', () => {
    //         const { inputField } = renderAndActOn(<TokenInput />);
    //         user.click(inputField);
    //         expect(inputField).toHaveFocus();
    //     });
    //     test('pre display', () => {
    //         const { preDisplay, inputField } = renderAndActOn(<TokenInput />);
    //         user.click(preDisplay);
    //         expect(inputField).toHaveFocus();
    //     });
    //     test('post display', () => {
    //         const { postDisplay, inputField } = renderAndActOn(<TokenInput />);
    //         user.click(postDisplay);
    //         expect(inputField).toHaveFocus();
    //     });

    //     test('token input', () => {
    //         const { tokenInput, inputField } = renderAndActOn(<TokenInput />);
    //         user.click(tokenInput);
    //         expect(inputField).toHaveFocus();
    //     });
    // });
    test.skip('can apply style colors', () => {
        const { tokenInput } = renderAndActOn(<TokenInput style={{ color: 'blue' }} />);
        expect(tokenInput).toHaveStyle('color: blue');
    });
    test.skip('can apply classNames', () => {
        const fancyClass = 'myHappyClass';
        const { tokenInput } = renderAndActOn(<TokenInput className={fancyClass} />);
        expect(tokenInput).toHaveClass('myHappyClass');
    });
    test('autofocus', () => {
        const { inputField } = renderAndActOn(<TokenInput autofocus={true} />);
        expect(inputField).toHaveFocus();
    });
    // describe('viewBuilder', () => {
    //     test('can use transformer', () => {
    //         const value = 'abc def';
    //         const tokenizer = jest.fn(_ => _);
    //         const viewBuilder = jest.fn();
    //         renderAndActOn(<TokenInput value={value} transformer={[tokenizer, viewBuilder]} />);
    //         expect(tokenizer).toHaveBeenCalledTimes(3);
    //         expect(tokenizer.mock.calls).toEqual([['abc'], ['def'], ['']]);

    //         expect(viewBuilder).toHaveBeenCalledTimes(3);
    //         expect(viewBuilder.mock.calls).toEqual([['abc'], ['def'], ['']]);
    //     });
    // });
    test.skip('can type', () => {
        const { container, inputField, debug } = renderAndActOn(<TokenInput autofocus={true} />);
        // act(() => {
        dispatch('keyDown', { key: 'm', keyCode: 77, which: 77, on: container });
        dispatch('keyUp', { key: 'm', keyCode: 77, which: 77, on: container });
        dispatch('change', { target: { name: 'zoomLevel', value: 'ab' }, on: container });

        // });
        // requestAnimationFrame(() => {
        expect(inputField.innerHTML).toEqual('abc');
        // done();
        // });
        // await waitForDomChange({ container: container });
    });
    test.skip('prevents Enter', async () => {
        const { inputField, debug } = renderAndActOn(<TokenInput autofocus={true} />);

        // await user.type(inputField, 'koko\nloro');
        fireEvent.keyDown(inputField, { key: 'a' });
        fireEvent.keyUp(inputField, { key: 'a' });
        dispatch('keyPress', { key: 'a' });

        fireEvent.keyPress(inputField, { key: 'a' });

        fireEvent.keyDown(inputField, { key: 'Enter' });
        fireEvent.keyUp(inputField, { key: 'Enter' });

        fireEvent.keyPress(inputField, { key: 'Enter' });

        fireEvent.keyPress(inputField, { key: 'b' });
        fireEvent.keyDown(inputField, { key: 'b' });
        fireEvent.keyUp(inputField, { key: 'b' });

        debug(inputField);
        expect(inputField.innerHTML).toEqual('ab');
    });
    test.todo('tab index');
    test.todo('jumps words with alt');
});
