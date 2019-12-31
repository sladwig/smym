import { create } from 'zustand';

const initValues = { mode: 'none', value: '', length: 0, active: -1, suggestions: [] };

const [useSuggestionStore, suggestionStore] = create(set => ({
    ...initValues,
    up: () => set(state => ({ active: state.active <= 0 ? state.length - 1 : state.active - 1 })),
    down: () => set(state => ({ active: (state.active + 1) % state.length })),
    reset: () => set(initValues),
}));

export { useSuggestionStore, suggestionStore };
