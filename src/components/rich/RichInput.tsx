import React, { useState, useRef, useEffect } from 'react';
import './RichInput.css';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import applyDevTools from 'prosemirror-dev-tools';

import { schema } from './richSchema';
import { plugins } from './richPlugins';
import { nodeViews } from './nodes/nodes';
import { useUpdateState } from '../../hooks/useUpdateState';
import { useEditorState } from '../../hooks/useEditorState';

export const RichInput = () => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [editorView, setEditorView] = useState<EditorView>();

    const { state, dispatchTransaction, stateRef } = useEditorState(
        EditorState.create({ schema, plugins: plugins() }),
    );

    useEffect(() => {
        if (!editorRef.current) return;

        const view = new EditorView(editorRef.current, {
            nodeViews,
            state: stateRef.current,
            dispatchTransaction,
        });
        setEditorView(view);
        applyDevTools(view);
        return () => view.destroy();
    }, [dispatchTransaction, stateRef]);

    useUpdateState(editorView, state);

    return <div className="rich-input" ref={editorRef} />;
};
