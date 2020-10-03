import { AppState, AsyncAction, BookmarkItem, NewsItem } from './interfaces';
import { newsApi } from '../services/news';

export interface Action<Payload = any> {
  type: string;
  payload?: Payload;
}

export const ACTION_TYPE = {
  STATE_UPDATED: '[@STORE] State Updated',
  ADD_TO_BOOKMARKS: '[BOOKMARKS] Add',
  REMOVE_FROM_BOOKMARKS: '[BOOKMARKS] Remove',
  CHANGE_PAGE: '[NEWS] Change Page',
  SET_LOADING: '[NEWS] Set Loading',
  FETCH_NEWS_SUCCESS: '[NEWS] Update News',
};

export const stateUpdated = (): Action => ({
  type: ACTION_TYPE.STATE_UPDATED,
});

export const addToBookmarks = (item: NewsItem): Action => ({
  type: ACTION_TYPE.ADD_TO_BOOKMARKS,
  payload: { item },
});

export const removeFromBookmarks = (bookmark: BookmarkItem): Action => ({
  type: ACTION_TYPE.REMOVE_FROM_BOOKMARKS,
  payload: { bookmark },
});

export const setLoading = (loading: boolean): Action => ({
  type: ACTION_TYPE.SET_LOADING,
  payload: { loading },
});

export const updateNews = (payload: {
  results: NewsItem[];
  pages: number;
  currentPage: number;
}): Action => ({
  type: ACTION_TYPE.FETCH_NEWS_SUCCESS,
  payload,
});

export const changePage = (newPage: number): AsyncAction<AppState> => async (
  state,
  dispatch
) => {
  dispatch(setLoading(true));
  const apiResponse = await newsApi.get({ page: newPage });
  dispatch(setLoading(false));
  dispatch(updateNews(apiResponse));
};
