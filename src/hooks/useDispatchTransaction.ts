import { useStateRef } from './useStateRef';
import { useState, useCallback } from 'react';
import { EditorState } from 'prosemirror-state';

export function useEditorState(init: EditorState) {
    const [state, setEditorState] = useState<EditorState>(init);
    const stateRef = useStateRef(state);
    const dispatchTransaction = useCallback(
        (tx: any) => setEditorState(stateRef.current.apply(tx)),
        [setEditorState, stateRef],
    );
    return { state, setEditorState, dispatchTransaction, stateRef };
}
