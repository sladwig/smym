import { usePrevious } from './usePrevious';
import { useEffect } from 'react';
import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';

export function useUpdateState(editorView: EditorView | undefined, state: EditorState) {
    const previousState = usePrevious(state);
    useEffect(() => {
        if (!(editorView && previousState !== state)) return;
        editorView.updateState(state);
    }, [editorView, state, previousState]);
}
