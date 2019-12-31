import React, { useEffect } from 'react';
import { store } from '../store/Store';
import fuzzysearch from 'fuzzysearch';
import './SuggestionBox.css';
import { ReactComponent as EnterSvg } from '../images/enter-icon.svg';
import key, { KeyEvent, Callback } from 'keyboardjs';
import { replaceWordAt } from '../utils/word';
import { useSuggestionStore, suggestionStore } from '../zustand/SuggestionStore';
import { Suggestion } from './Suggestion';
import { inputStore } from '../zustand/InputStore';

export const SuggestionBox = () => {
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
            const { active, suggestions } = suggestionStore.getState();
            if (active < 0) return;

            const { value, position } = inputStore.getState();
            const [newValue, newPosition] = replaceWordAt(
                value,
                position,
                suggestions[active].name,
            );
            inputStore.setState({ value: newValue, position: newPosition, external: true });
        }) as Callback;

        key.bind('up', up);
        key.bind('down', down);
        key.bind('tab', tab);
        key.bind('enter', tab);
        return () => {
            key.unbind('up', up);
            key.unbind('down', down);
            key.unbind('tab', tab);
            key.unbind('enter', tab);
        };
    }, []);

    return suggestionFor(mode, value);
};

// paid
type SuggestionMode = 'none' | 'places';

const suggestionFor = (mode: SuggestionMode, searchTerm: string) => {
    if (mode === 'none') return null;
    if (mode !== 'places') return null;

    const filteredSuggestions = [...store.placesList]
        .filter(p => fuzzysearch(searchTerm, p.name))
        .map(p => ({ name: p.name, color: p.color }));

    suggestionStore.setState({
        length: filteredSuggestions.length,
        suggestions: filteredSuggestions,
    });
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
