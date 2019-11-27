import {
    inputRules,
    wrappingInputRule,
    textblockTypeInputRule,
    smartQuotes,
    emDash,
    ellipsis,
} from 'prosemirror-inputrules';

// : (NodeType) → InputRule
// Given a blockquote node type, returns an input rule that turns `"> "`
// at the start of a textblock into a blockquote.
export function blockQuoteRule(nodeType: any) {
    return wrappingInputRule(/^\s*>\s$/, nodeType);
}

export function buildInputRules(schema: any) {
    let rules = smartQuotes.concat(ellipsis, emDash),
        type;
    if ((type = schema.nodes.underline)) rules.push(blockQuoteRule(type));
    return inputRules({ rules });
}
