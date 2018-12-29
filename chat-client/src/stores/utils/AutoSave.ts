import { autorun, set, toJS } from 'mobx';

/**
 * Autosaves store to session storage. Also loads saved storage if one exists.
 * @param store
 */
export const autoSave = (store: any) => {
  let firstRun = true;

  // will run on change
  autorun(() => {
    // on load check if there's an existing store on sessionstorage and extend the store
    if (firstRun) {
      const existingStore = sessionStorage.getItem(store.constructor.name);

      if (existingStore) {
        set(store, JSON.parse(existingStore));
      }
    }

    // from then on serialize and save to sessionstorage
    sessionStorage.setItem(store.constructor.name, JSON.stringify(toJS(store)));
  });

  firstRun = false;
};
