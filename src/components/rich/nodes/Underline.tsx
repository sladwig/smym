import React, { RefObject } from 'react';
import ReactDOM from 'react-dom';
import { Node } from 'prosemirror-model';
import { EditorView, NodeView, Decoration } from 'prosemirror-view';

interface IProps {
    usingRef: RefObject<HTMLParagraphElement>;
}
const Underlined = ({ usingRef }: IProps) => {
    return <p ref={usingRef} style={{ textDecoration: 'underline' }}></p>;
};

export class Underline implements NodeView {
    dom: HTMLElement;
    contentDOM: HTMLElement;
    ref: React.RefObject<HTMLParagraphElement>;

    constructor(
        private node: Node,
        private view: EditorView,
        private getPos: boolean | (() => number),
        private decorations: Decoration[],
    ) {
        this.ref = React.createRef();

        this.dom = document.createElement('span');
        this.dom.classList.add('node__dom');

        this.contentDOM = document.createElement('span');
        this.contentDOM.classList.add('node__content-dom');

        ReactDOM.render(<Underlined usingRef={this.ref} />, this.dom, this.putContentDomInRef);
    }

    update(node: Node) {
        return true;
    }

    private putContentDomInRef = () => {
        if (!this.ref.current) return;
        this.ref.current.appendChild(this.contentDOM);
    };

    destroy() {
        ReactDOM.unmountComponentAtNode(this.dom);
    }
}
