import React, { useState, useRef, useEffect } from 'react';
import './RichInput.css';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import applyDevTools from 'prosemirror-dev-tools';

import { schema } from './richSchema';
import { plugins } from './richPlugins';
import { nodeViews } from './nodes/nodes';

interface IProps {}

export const RichInput = ({  }: IProps) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [editorView, setEditorView] = useState<EditorView>();
    const [editorState] = useState<EditorState>(
        EditorState.create({
            schema,
            plugins: plugins(),
        }),
    );
    useEffect(() => {
        if (!editorRef.current) return;
        const view = new EditorView(editorRef.current, {
            nodeViews,
            state: editorState,
        });
        setEditorView(view);
        applyDevTools(view);
        return () => {
            if (view) view.destroy();
        };
    }, []);

    return <div className="rich-input" ref={editorRef} />;
};
