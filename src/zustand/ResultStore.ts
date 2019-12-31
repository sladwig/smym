import { create } from 'zustand';

const initialValue = { isComplete: false };
const [useResultStore, resultStore] = create(set => ({
    ...initialValue,
    reset: () => set(initialValue),
}));
export { useResultStore, resultStore };
