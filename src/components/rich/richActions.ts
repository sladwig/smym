import { EditorState, Transaction } from 'prosemirror-state';

import { schema } from './richSchema';

export function createNewUnderline(state: EditorState, dispatch: (tr: Transaction) => void) {
    const { $from, $to } = state.selection;
    let empty = schema.nodes.underline.createAndFill();
    const endOfBlock = $from.end();
    if (empty) {
        const tr = state.tr.insert(endOfBlock, empty);
        dispatch(tr);
        return true;
    }
    return false;
}
