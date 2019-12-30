import React from 'react';
import { create } from 'zustand';
import { store } from '../store/Store';
import fuzzysearch from 'fuzzysearch';
import './SuggestionBox.css';
import { IPlace } from '../store/Place';

interface IProps {}

export const SuggestionBox = ({}: IProps) => {
    const mode = useSuggestionStore(state => state.mode);
    const value = useSuggestionStore(state => state.value);

    return suggestionFor(mode, value);
};

type SuggestionMode = 'none' | 'places';

const suggestionFor = (mode: SuggestionMode, searchTerm: string) => {
    if (mode === 'none') return null;
    if (mode !== 'places') return null;

    const filteredSuggestions = [...store.placesList].filter(p => fuzzysearch(searchTerm, p.name));

    suggestionStore.setState({ length: filteredSuggestions.length });

    return <div className="suggestion-box">{filteredSuggestions.map(Suggestion)}</div>;
};

const Suggestion = ({ name, color: backgroundColor }: IPlace) => (
    <div className="suggestion">
        <div className="place-suggestion" style={{ backgroundColor }}>
            {name}
        </div>
    </div>
);

const [useSuggestionStore, suggestionStore] = create(set => ({
    mode: 'none',
    value: '',
    length: 0,
    reset: () => set({ mode: 'none', value: '' }),
}));

export { useSuggestionStore, suggestionStore };
