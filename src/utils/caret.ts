import { isCaret, AnyCharacterT, isChar } from '../components/WordPresenter';

export const addCaretAt = (anArray: any[], position: number) => {
    const clone = anArray.slice();
    clone.splice(Math.max(position, 0), 0, { type: 'caret' });
    return clone;
};

export const getCaretOf = (chars: { type: string }[]): number => {
    return chars.findIndex(isCaret);
};

export const getCommaPosition = (chars: AnyCharacterT[]): number => {
    return chars.findIndex(char => (isChar(char) ? [',', '.'].includes(char.value) : false));
};

export const withCaretOfOn = (
    original: AnyCharacterT[],
    other: AnyCharacterT[],
): AnyCharacterT[] => {
    const position = getCaretOf(original);
    return position < 0 ? other : addCaretAt(other, position);
};
