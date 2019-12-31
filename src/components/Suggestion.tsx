import React from 'react';
import './Suggestion.css';
import classnames from 'classnames';
import { useSuggestionStore } from '../zustand/SuggestionStore';

interface SuggestionProps {
    text: string;
    backgroundColor: string;
    index: number;
}
export const Suggestion = ({ text, backgroundColor, index }: SuggestionProps) => {
    const activeIndex = useSuggestionStore(state => state.active);
    const active = index === activeIndex;
    return (
        <div className={classnames('suggestion', { active })}>
            <div className="place-suggestion" style={{ backgroundColor }}>
                {text}
            </div>
        </div>
    );
};
