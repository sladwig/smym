import { onSnapshot } from 'mobx-state-tree';

export const createPersistenStore = (store: any, defaultValue: any, storeName: string) => {
    let inStore = window.localStorage.getItem(storeName);
    inStore = inStore ? JSON.parse(inStore) : defaultValue;

    const createdStore = store.create(inStore);

    onSnapshot(createdStore, snapshot => {
        window.localStorage.setItem(storeName, JSON.stringify(snapshot));
    });

    return createdStore;
};
