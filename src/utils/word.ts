export const replaceWordAt = (
    original: string,
    position: number,
    newWord: string,
): [string, number] => {
    const [start, end, length] = wordAt(original, position);

    newWord = start + length === original.length ? `${newWord} ` : newWord;

    return [`${original.slice(0, start)}${newWord}${original.slice(end)}`, start + newWord.length];
};

export const wordAt = (original: string, position: number): [number, number, number] => {
    position = minMaxValue(0, original.length, position);

    const [front, tail] = [original.slice(0, position), original.slice(position)];

    const start = front.lastIndexOf(' ') + 1;

    const tailIndex = tail.indexOf(' ');
    const end = position + (tailIndex < 0 ? tail.length : tailIndex);

    const length = end - start;

    return [start, end, length];
};

const { min, max } = Math;
export const minMaxValue = (low: number, high: number, value: number) => max(low, min(high, value));
