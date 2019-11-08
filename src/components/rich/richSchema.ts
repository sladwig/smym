import { Schema } from 'prosemirror-model';

export const schema = new Schema({
    nodes: {
        doc: {
            content: 'block+',
        },
        underline: {
            group: 'block',
            content: 'inline*',
            parseDOM: [{ tag: 'p' }],
            toDOM: () => ['p', 0],
        },
        text: {
            group: 'inline',
        },
    },
});
