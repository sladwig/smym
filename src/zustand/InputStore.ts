import { create } from 'zustand';

const initialValue = { value: '', position: 0, hasFocus: false, external: false };
const [useInputStore, inputStore] = create(set => ({
    ...initialValue,
    reset: () => set(initialValue),
}));

export { useInputStore, inputStore };
