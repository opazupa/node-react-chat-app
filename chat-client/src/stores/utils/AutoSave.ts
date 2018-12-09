import { autorun, set, toJS } from 'mobx';

export const autoSave = (store: any) => {
  console.log(store);
  let firstRun = true;

  // will run on change
  autorun(() => {
    // on load check if there's an existing store on localStorage and extend the store
    if (firstRun) {
      const existingStore = sessionStorage.getItem(store.constructor.name);

      if (existingStore) {
        set(store, JSON.parse(existingStore));
      }
    }

    // from then on serialize and save to localStorage
    sessionStorage.setItem(store.constructor.name, JSON.stringify(toJS(store)));
  });

  firstRun = false;
};
