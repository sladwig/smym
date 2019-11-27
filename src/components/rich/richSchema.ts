import { Schema } from 'prosemirror-model';

export const schema = new Schema({
    nodes: {
        doc: {
            content: '(text | token)+',
        },
        underline: {
            group: 'token',
            content: 'text*',
            inline: true,
            parseDOM: [{ tag: 'span' }],
            toDOM: () => ['span', 0],
        },
        text: {
            inline: true,
            group: 'inline',
        },
    },
});
