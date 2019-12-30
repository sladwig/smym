import React, { useEffect } from 'react';
import { create } from 'zustand';
import { store } from '../store/Store';
import fuzzysearch from 'fuzzysearch';
import './SuggestionBox.css';
import { ReactComponent as EnterSvg } from '../images/enter-icon.svg';
import key, { KeyEvent, Callback } from 'keyboardjs';
import classnames from 'classnames';

interface IProps {}

export const SuggestionBox = ({}: IProps) => {
    const mode = useSuggestionStore(state => state.mode);
    const value = useSuggestionStore(state => state.value);

    useEffect(() => {
        const up = ((e: KeyEvent) => {
            e.preventDefault();
            suggestionStore.getState().up();
        }) as Callback;

        const down = ((e: KeyEvent) => {
            e.preventDefault();
            suggestionStore.getState().down();
        }) as Callback;

        const tab = ((e: KeyEvent) => {
            e.preventDefault();
        }) as Callback;

        key.bind('up', up);
        key.bind('down', down);
        key.bind('tab', tab);
        return () => {
            key.unbind('up', up);
            key.unbind('down', down);
            key.unbind('tab', tab);
        };
    }, []);

    return suggestionFor(mode, value);
};

type SuggestionMode = 'none' | 'places';

const suggestionFor = (mode: SuggestionMode, searchTerm: string) => {
    if (mode === 'none') return null;
    if (mode !== 'places') return null;

    const filteredSuggestions = [...store.placesList].filter(p => fuzzysearch(searchTerm, p.name));

    suggestionStore.setState({ length: filteredSuggestions.length });
    if (filteredSuggestions.length === 0) return null;

    return (
        <div className="suggestion-box">
            {filteredSuggestions.map((place, index) => (
                <Suggestion
                    key={`suggestion-${place.name}`}
                    text={place.name}
                    backgroundColor={place.color}
                    index={index}
                />
            ))}
            <div className="suggestion suggestion-info">
                Press{' '}
                <div className="rectangle-icon-wrapper" style={{ marginLeft: 15, marginRight: 15 }}>
                    <EnterSvg />
                </div>{' '}
                to select action
            </div>
        </div>
    );
};

interface SuggestionProps {
    text: string;
    backgroundColor: string;
    index: number;
}
const Suggestion = ({ text, backgroundColor, index }: SuggestionProps) => {
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

const [useSuggestionStore, suggestionStore] = create(set => ({
    mode: 'none',
    value: '',
    length: 0,
    active: -1,
    up: () => set(state => ({ active: state.active <= 0 ? state.length - 1 : state.active - 1 })),
    down: () => set(state => ({ active: (state.active + 1) % state.length })),
    reset: () => set({ mode: 'none', value: '', active: -1 }),
}));

export { useSuggestionStore, suggestionStore };
