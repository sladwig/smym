import { types, Instance } from 'mobx-state-tree';
import randomcolor from 'randomcolor';
import { random } from '../helper';
import { isTestRun } from '../utils/testHelper';

const hues = ['melon', 'light-salmon', 'really-light-blue', 'bright-cyan'];
export const color = (hue = random(hues)) => (!isTestRun ? randomcolor({ hue }) : '#ffffff');

export const Place = types
    .model('Place', {
        name: types.identifier,
        color: types.optional(types.string, color()),
    })
    .actions(self => ({
        setColor: (newColor: string = color()) => {
            self.color = newColor;
        },
    }));

export interface IPlace extends Instance<typeof Place> {}
