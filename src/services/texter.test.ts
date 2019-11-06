import { text } from './texter';
import { getSnapshot as snap } from 'mobx-state-tree';
const logsnap = (_: any) => console.log(snap(_));
describe('Texter', () => {
    describe('create', () => {
        test('sets caret to the end by default', () => {
            const t = text('a db hij klms');
            expect(snap(t)).toEqual({ value: 'a db hij klms', focus: 3, caret: 4 });
        });

        test('can initialize with 1 parameter', () => {
            const t = text('a db hij klms', 2);
            expect(snap(t)).toEqual({ value: 'a db hij klms', focus: 2, caret: 3 });
        });
        test('can initialize with 2 parameter', () => {
            const t = text('a db hij klms', 1, 1);
            expect(snap(t)).toEqual({ value: 'a db hij klms', focus: 1, caret: 1 });
        });

        test('maxFocus', () => {
            const t = text('a d h k d');
            expect(t.maxFocus).toEqual(4);
        });

        test('maxCaret', () => {
            const t = text('abcdefhij aa');
            expect(t.maxCaret).toEqual(2);

            t.setFocus(0);
            expect(t.maxCaret).toEqual(9);
        });
        test('maxPosition', () => {
            const str = 'abcdefhij aa';
            const t = text(str);
            expect(t.maxPosition).toEqual(str.length);
        });

        test('wordCarets', () => {
            const t = text('a db hij klms');
            expect(t.wordCarets).toEqual([1, 2, 3, 4]);
        });

        test('maxCaretAt', () => {
            const t = text('a db hij klms');
            expect(t.maxCaretAt(0)).toEqual(1);
            expect(t.maxCaretAt(1)).toEqual(2);
            expect(t.maxCaretAt(2)).toEqual(3);
            expect(t.maxCaretAt(3)).toEqual(4);
        });

        test('endCoors', () => {
            const t = text('a db hij klms');
            expect(t.endCoords).toEqual([3, 4]);
        });

        test('coords', () => {
            const t = text('a db hij klms');
            t.at([2, 1]);
            expect(t.coords).toEqual([2, 1]);
        });
        test('position', () => {
            const t = text('a db hij klms');
            t.at([2, 1]);
            expect(t.position).toEqual(6);
        });
        test('isLast', () => {
            const t = text('a db hij klms');
            expect(t.isLast).toBe(true);

            t.moveTo(1);
            expect(t.isLast).toBe(true);
            t.moveTo(3);
            expect(t.isLast).toBe(false);
        });
        test('isFirst', () => {
            const t = text('a db hij klms');
            expect(t.isFirst).toBe(false);

            t.moveTo(0);
            expect(t.isFirst).toBe(true);
            t.moveTo(2);
            expect(t.isFirst).toBe(true);
        });
        test('isStart', () => {
            const t = text('a db hij klms');
            expect(t.isStart).toBe(false);

            t.moveTo(1);
            expect(t.isStart).toBe(false);
            t.moveTo(3);
            expect(t.isStart).toBe(false);
            t.moveTo(0);
            expect(t.isStart).toBe(true);
        });

        test('isEnd', () => {
            const t = text('a db hij klms');
            expect(t.isEnd).toBe(true);

            t.moveTo(1);
            expect(t.isEnd).toBe(false);
            t.moveTo(3);
            expect(t.isEnd).toBe(false);

            t.moveTo(0);
            expect(t.isEnd).toBe(false);
        });
    });

    describe('focus', () => {
        test('can set focus', () => {
            const t = text('abc def hij klm', 0, 0);
            t.setFocus(2);
            expect(t.focus).toEqual(2);

            t.set({ focus: 1 });
            expect(t.focus).toEqual(1);
        });

        test('can only set to maximum length', () => {
            const t = text('abc def hij klm', 5);
            expect(t.focus).toEqual(3);

            t.setFocus(70);
            expect(t.focus).toEqual(3);

            t.set({ caret: 30 });
            expect(t.focus).toEqual(3);
        });

        test('can not set below 0', () => {
            const t = text('abc def hij klm');
            t.at([-5, 0]);

            expect(t.focus).toEqual(0);

            t.setFocus(-20);
            expect(t.focus).toEqual(0);

            t.set({ focus: -5 });
            expect(t.focus).toEqual(0);
        });

        test('corrects caret if caret position is to big', () => {
            const t = text('abc defhijklm');
            expect(t.caret).toEqual(9);

            t.setFocus(0);

            expect(t.caret).toEqual(3);
        });
    });

    describe('caret', () => {
        test('can set caret', () => {
            const t = text('abc def hij klm', 0, 0);

            t.setCaret(2);
            expect(t.caret).toEqual(2);

            t.set({ caret: 1 });
            expect(t.caret).toEqual(1);
        });

        test('can only set to maximum length', () => {
            const t = text('abc def hij klm', 0, 50);
            expect(t.caret).toEqual(3);

            t.setCaret(70);
            expect(t.caret).toEqual(3);

            t.set({ caret: 70 });
            expect(t.caret).toEqual(3);

            // t.moveCaret(30);
            // expect(t.caret).toEqual(3);
        });

        test('can not set below 0', () => {
            const t = text('abc def hij klm');
            // expect(t.caret).toEqual(0);

            t.setCaret(-20);
            expect(t.caret).toEqual(0);

            t.set({ caret: -5 });
            expect(t.caret).toEqual(0);

            t.at([1, -20]);
            expect(t.caret).toEqual(0);
        });
    });

    describe('move', () => {
        test('can move caret forward', () => {
            const t = text('abc de hihi klm', 0, 0);
            expect(t.coords).toEqual([0, 0]);

            t.move(1);
            expect(t.coords).toEqual([0, 1]);

            t.move(2);
            expect(t.coords).toEqual([0, 3]);
        });

        test('can move caret into next focus', () => {
            const t = text('abc def hij klm', 0, 3);

            t.move(1);
            expect(t.coords).toEqual([1, 0]);

            t.move(5);
            expect(t.coords).toEqual([2, 1]);
        });

        test('can move caret backward', () => {
            const t = text('abc def hij klm');
            expect(t.coords).toEqual([3, 3]);

            t.move(-1);
            expect(t.coords).toEqual([3, 2]);

            t.move(-2);
            expect(t.coords).toEqual([3, 0]);
        });

        test('can move caret into previous focus', () => {
            const t = text('abc def hij klm', 3, 0);

            t.move(-1);
            expect(t.coords).toEqual([2, 3]);

            t.move(-5);
            expect(t.coords).toEqual([1, 2]);
        });

        test("can't move over the edges", () => {
            const t = text('abc def hij klm');

            t.move(-99);
            expect(t.coords).toEqual([0, 0]);

            t.move(99);
            expect(t.coords).toEqual([3, 3]);
        });
    });

    describe('moveTo', () => {
        test('moveTo', () => {
            const t = text('abc def hij klm');

            t.moveTo(7);
            expect(t.coords).toEqual([1, 3]);

            t.moveTo(9);
            expect(t.coords).toEqual([2, 1]);
        });

        test('moveTo the end', () => {
            const t = text('abc def hij klm');

            t.moveTo(0);
            expect(t.coords).toEqual([0, 0]);

            t.moveTo(-99);
            expect(t.coords).toEqual([0, 0]);

            // t.moveTo(15);
            // expect(t.coords).toEqual([3, 3]);

            // t.move(99);
            // expect(t.coords).toEqual([3, 3]);
        });
    });

    describe('jump', () => {
        test('jump down and up on last position', () => {
            const t = text('abc defe hi klm');

            expect(t.coords).toEqual([3, 3]);

            t.jump(-2);
            expect(t.coords).toEqual([1, 4]);

            t.jump(1);
            expect(t.coords).toEqual([2, 2]);

            t.jump(-33);
            expect(t.coords).toEqual([0, 3]);
        });

        test('keep caret till the end', () => {
            const t = text('abc def hij klmlll');

            t.moveTo(0);
            expect(t.coords).toEqual([0, 0]);

            t.jump(2);
            expect(t.coords).toEqual([2, 0]);

            t.jump(-1);
            expect(t.coords).toEqual([1, 0]);

            t.jump(34);
            expect(t.coords).toEqual([3, 0]);

            t.moveTo(150);

            expect(t.coords).toEqual([3, 6]);

            t.jump(-1);
            expect(t.coords).toEqual([2, 3]);
        });
    });

    describe('value', () => {
        test('set', () => {
            const t = text();

            t.setValue('abc def');
            expect(t.value).toEqual('abc def');

            t.set({ value: 'jo jo' });
            expect(t.value).toEqual('jo jo');
        });
        test('keeps caret position', () => {
            const t = text('abc def hij klm');
            t.moveTo(6);

            expect(t.coords).toEqual([1, 2]);
            expect(t.position).toBe(6);

            t.setValue('kokolores mina');
            expect(t.coords).toEqual([0, 6]);
            expect(t.position).toBe(6);
        });

        test('smaller if new string is smaller', () => {
            const t = text('abc def hij klm');
            t.moveTo(6);

            t.setValue('abc');
            expect(t.position).toBe(3);
        });

        test('keep caret at end if string grows', () => {
            const t = text('abc');

            expect(t.position).toBe(3);
            t.setValue('abcde');
            expect(t.position).toBe(5);
        });
    });

    describe('insert', () => {
        test('characters, strings and numbers', () => {
            const t = text('abc def');
            t.moveTo(4);
            t.insert('a');
            expect(t.value).toEqual('abc adef');

            t.moveTo(2);
            t.insert('dodo');
            expect(t.value).toEqual('abdodoc adef');

            t.moveTo(0);
            t.insert('3');
            expect(t.value).toEqual('3abdodoc adef');
        });

        test('moves caret', () => {
            const t = text('bbbbb');
            t.moveTo(2);
            t.insert('a');
            expect(t.position).toEqual(3);

            t.insert('dodo');
            expect(t.position).toEqual(7);
        });

        test('space', () => {
            const t = text('bbbbb');
            t.moveTo(2);
            t.insert(' ');
            expect(t.position).toEqual(3);

            t.insert('dodo');
            expect(t.position).toEqual(7);
        });
    });

    describe('delete', () => {
        test('one and more characters', () => {
            const t = text('ababab');
            t.moveTo(2);

            t.delete();
            expect(t.value).toEqual('aabab');

            t.moveTo(3).delete(20);
            expect(t.value).toEqual('ab');
        });

        test('moves caret', () => {
            const t = text('ababab');
            t.moveTo(2);

            t.delete();
            expect(t.position).toEqual(1);

            t.moveTo(3).delete(20);
            expect(t.position).toEqual(0);
        });
    });

    describe('update', () => {
        test('updates current word', () => {
            const t = text('ab ab ab');
            t.moveTo(3);

            t.update('hello');

            expect(t.value).toEqual('ab hello ab');
        });

        test('creates a split on space', () => {
            const t = text('bbb');

            t.update('bbb ');
            expect(t.position).toEqual(4);
            expect(t.splited).toEqual(['bbb', '']);
        });

        test('updates caret position', () => {
            const t = text('ab ab ab');
            t.moveTo(5);

            t.update('abbb');

            expect(t.position).toBe(7);
        });

        test('updates caret position back', () => {
            const t = text('ab abbb ab');
            t.moveTo(5);

            t.update('abb');

            expect(t.position).toBe(4);
        });

        test('space', () => {
            const t = text('aaabbb');
            t.moveTo(3);
            expect(t.position).toEqual(3);

            t.update('aaa bbb');
            expect(t.position).toEqual(4);
            expect(t.value).toEqual('aaa bbb');
            expect(t.splited).toEqual(['aaa', 'bbb']);
        });
    });

    describe('internals', () => {
        test('positionToCoords', () => {
            const t = text('ab ab ab');
            expect(t.positionToCoords).toEqual([
                [0, 0],
                [0, 1],
                [0, 2],
                [1, 0],
                [1, 1],
                [1, 2],
                [2, 0],
                [2, 1],
                [2, 2],
            ]);
        });
        test('coordsToPosition', () => {
            const t = text('ab ab ab');
            expect(t.coordsToPosition).toEqual({
                '0-0': 0,
                '0-1': 1,
                '0-2': 2,
                '1-0': 3,
                '1-1': 4,
                '1-2': 5,
                '2-0': 6,
                '2-1': 7,
                '2-2': 8,
            });
        });

        test('same position different coords', () => {
            const t = text('ab ab ab');
            t.moveTo(3);

            expect(t.position).toEqual(3);
            expect(t.coords).toEqual([1, 0]);

            t.setValue('aaaaaaaa');
            expect(t.position).toEqual(3);
            expect(t.coords).toEqual([0, 3]);

            t.setValue('        ');
            expect(t.position).toEqual(3);
            expect(t.coords).toEqual([3, 0]);
        });

        test('same coords different position', () => {
            const t = text('ab ab ab');
            t.at([1, 0]);

            expect(t.position).toEqual(3);
            expect(t.coords).toEqual([1, 0]);

            t.setValue('aaaa aaaa');
            t.at([1, 0]);
            expect(t.position).toEqual(5);
            expect(t.coords).toEqual([1, 0]);

            t.setValue('        ');
            t.at([1, 0]);
            expect(t.position).toEqual(1);
            expect(t.coords).toEqual([1, 0]);
        });

        test('splited', () => {
            const t = text('ab ab ab ab ab');
            expect(t.splited).toEqual(['ab', 'ab', 'ab', 'ab', 'ab']);
        });

        describe('divided', () => {
            test('in middle', () => {
                const t = text('ab ab ab ab ab');
                t.at([2, 0]);

                expect(t.divided).toEqual([['ab', 'ab'], ['ab'], ['ab', 'ab']]);
            });
            test('at beginning', () => {
                const t = text('ab ab ab ab ab');
                t.at([2, 0]);

                t.setFocus(0);

                expect(t.divided).toEqual([['ab'], ['ab', 'ab', 'ab', 'ab']]);

                t.setFocus(0);
            });
            test('at end', () => {
                const t = text('ab ab ab ab ab');

                t.setFocus(4);

                expect(t.divided).toEqual([['ab', 'ab', 'ab', 'ab'], ['ab']]);
            });
        });
    });
});
