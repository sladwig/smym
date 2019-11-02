declare module 'fuzzysearch';

type StringIndex<T> = {
    [key: string]: T;
};
type NumnerIndex<T> = {
    [index: number]: T;
};
