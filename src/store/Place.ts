import { types, Instance } from 'mobx-state-tree';
import randomcolor from 'randomcolor';

const hues = ['melon', 'light-salmon', 'really-light-blue', 'bright-cyan'];
export const color = () => randomcolor({ hue: hues[Math.ceil(Math.random() * hues.length)] });

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

export type IUser = Instance<typeof Place>;
