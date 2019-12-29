import React from 'react';
import { create } from 'zustand';

interface IProps {}

export const SuggestionBox = ({}: IProps) => {
    const mode = useSuggestionStore(state => state.mode);

    return suggestionMode(mode);
};

type SuggestionMode = 'none' | 'places';

const suggestionMode = (mode: SuggestionMode) => {
    if (mode === 'none') return null;
    return (
        <div className="suggestion-box">
            <div>a suggestion</div>
        </div>
    );
};

const [useSuggestionStore, suggestionStore] = create(set => ({
    mode: 'none',
    value: '',
    reset: () => set({ mode: 'none', value: '' }),
}));

export { useSuggestionStore, suggestionStore };
