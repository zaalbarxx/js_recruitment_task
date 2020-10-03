import { DeepPartial, HashMap } from '../shared/interfaces';
import { Action } from './actions';

export interface NewsItem {
  id: string;
  sectionName: string;
  title: string;
  publicationDate: string;
  url: string;
}

export interface BookmarkItem {
  id: string;
  title: string;
  url: string;
}

export interface AppState {
  news: {
    list: NewsItem[];
    pagination: {
      pageNumber: number;
      size: number;
      pages: number;
    };
    loading: boolean;
    filter: string;
    section: string;
    bookmarks: BookmarkItem[];
  };
}

export type HandlersMap<State> = HashMap<
  (payload: any, state: State) => DeepPartial<State>
>;

export type Dispatch = (action: Action) => void;

export type AsyncAction<State> = (getState: () => State, dispatch: Dispatch) => void;
