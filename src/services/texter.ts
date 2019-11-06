import { types, Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';
import isEqual from 'react-fast-compare';

interface Caret {
    focus: number;
    caret: number;
    value: string;
}
type Coords = [number, number];

export const Texter = types
    .model('Texter', {
        focus: 0,
        caret: 0,
        value: '',
    })
    .views(self => ({
        get splited() {
            return self.value.split(' ');
        },
        get divided() {
            const clone = this.splited.slice();
            const pre = clone.slice(0, self.focus);
            const focus = [clone[self.focus]];
            const post = clone.slice(self.focus + 1);
            const result = [];
            if (pre.length > 0) result.push(pre);
            if (focus.length > 0) result.push(focus);
            if (post.length > 0) result.push(post);
            return result;
        },
        get maxFocus() {
            return this.splited.length - 1;
        },
        get maxCaret() {
            return this.maxCaretAt(self.focus);
        },
        get maxPosition() {
            return self.value.length;
        },
        get wordCarets() {
            return this.splited.map(_ => _.length);
        },
        maxCaretAt(focus: number) {
            return this.wordCarets[focus];
        },
        get endCoords(): Coords {
            return [this.maxFocus, this.maxCaretAt(this.maxFocus)];
        },
        get coords(): Coords {
            return [self.focus, self.caret];
        },
        coordsAt(position: number): Coords {
            return this.positionToCoords[position];
        },

        get positionToCoords(): Array<Coords> {
            return this.splited.flatMap((word, focusIndex: number) => {
                return `${word} `
                    .split('')
                    .map((_, charIndex: number): Coords => [focusIndex, charIndex]);
            });
        },
        get position() {
            return this.positionAt(this.coords);
        },
        positionAt(coords: Coords): number {
            return this.coordsToPosition[asIndex(coords)];
        },
        get coordsToPosition() {
            return this.positionToCoords.reduce(
                (result, coords, position) => {
                    result[asIndex(coords)] = position;
                    return result;
                },
                {} as { [_: string]: number },
            );
        },
        get isFirst() {
            return self.caret === 0;
        },
        get isLast() {
            return self.caret === this.maxCaret;
        },
        get isStart() {
            return this.position === 0;
        },
        get isEnd() {
            return this.position === this.maxPosition;
        },
    }))
    .actions(self => ({
        at([focus, caret]: Coords) {
            return this.set({ focus, caret });
        },
        afterCreate() {
            this.at(self.endCoords);
        },
        set({ focus, caret, value }: Partial<Caret>) {
            this.setFocus(focus);
            this.setCaret(caret);
            this.setValue(value);
            return this;
        },
        setFocus(focus?: number) {
            if (focus === undefined) return;
            if (focus === self.focus) return;

            focus = valueMinMax(focus, 0, self.maxFocus);

            self.focus = focus;

            this.correctCaretIfTooBig();
            return this;
        },
        setCaret(caret?: number) {
            if (caret === undefined) return;
            caret = valueMinMax(caret, 0, self.maxCaret);

            self.caret = caret;
            return this;
        },
        setValue(value?: string) {
            if (value === undefined) return;

            const atTheEnd = isEqual(self.coords, self.endCoords);
            const position = self.position;

            self.value = value;

            atTheEnd ? this.at(self.endCoords) : this.moveTo(position);
            return this;
        },
        correctCaretIfTooBig() {
            if (self.maxCaret < self.caret) this.setCaret(self.maxCaret);
        },
        move(value = 0) {
            const nextPosition = valueMinMax(self.position + value, 0, self.maxPosition);
            this.moveTo(nextPosition);
            return this;
        },
        moveTo(position: number) {
            position = valueMinMax(position, 0, self.maxPosition);
            return this.at(self.coordsAt(position));
        },
        update(newWord: string) {
            const clone = self.splited.slice();
            const diff = newWord.length - clone[self.focus].length;
            clone.splice(self.focus, 1, newWord);
            this.move(diff);
            return this.setValue(clone.join(' '));
        },
        delete(howMany = 1) {
            const clone = self.value.split('');
            const atIndex = valueMinMax(self.position - howMany, 0, clone.length);
            const possible = Math.min(self.position - atIndex, howMany);
            clone.splice(atIndex, possible);
            const newValue = clone.join('');
            this.setValue(newValue);
            this.move(-possible);
            return this;
        },
        insert(add: string) {
            if (!add) return;

            const clone = self.value.split('');
            clone.splice(self.position, 0, ...add.split(''));
            const newValue = clone.join('');
            this.setValue(newValue);
            this.move(add.length);
            return this;
        },
        jump(value = 0) {
            const isLast = self.maxCaret === self.caret;
            this.setFocus(self.focus + value);
            if (isLast) this.setCaret(self.maxCaret);
        },
    }));

export const text = (value: string = '', focus?: number, caret?: number): ITexter => {
    const result = Texter.create({ value });
    result.set({ focus, caret });
    return result;
};

const valueMinMax = (x: number, min: number, max: number) => Math.max(min, Math.min(max, x));

const asIndex = ([focus, caret]: Coords) => `${focus}-${caret}`;

export type ITexter = Instance<typeof Texter>; // => { title: string; setTitle: (v: string) => void }

export type ITexterSnapshotIn = SnapshotIn<typeof Texter>; // => { title?: string }

export type ITexterSnapshotOut = SnapshotOut<typeof Texter>;
