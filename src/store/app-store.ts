import { Store } from './store';
import { AppState } from './interfaces';
import { DeepPartial } from '../shared/interfaces';
import { deepMerge } from '../utils/deep-merge';

export let appStore: Store<AppState>;

export const createInitialAppState = (state?: DeepPartial<AppState>): AppState =>
  deepMerge(
    {
      news: {
        list: [],
        filter: '',
        pagination: {
          pageNumber: 0,
          size: 10,
          pages: 0,
        },
        bookmarks: [],
        loading: false,
        section: '',
      },
    },
    state ?? ({} as any)
  );


export const setStore = (store: Store<AppState>) => {
  appStore = store;
}
