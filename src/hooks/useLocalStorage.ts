export function useLocalStorage(key: string, fallback: any = null) {
    return localStorage.getItem(key) || fallback;
}

export function useHasInLocalStorage(key: string): boolean {
    return !!localStorage.getItem(key);
}
