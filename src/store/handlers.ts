import { AppState, BookmarkItem, HandlersMap, NewsItem } from './interfaces';
import { ACTION_TYPE } from './actions';
import { NewsResponse } from '../services/news';

export const handlers: HandlersMap<AppState> = {
  [ACTION_TYPE.ADD_TO_BOOKMARKS]: (payload: { item: NewsItem }, state) => {
    const { item } = payload;

    return {
      ...state,
      news: {
        bookmarks: [
          ...state.news.bookmarks,
          { id: item.id, title: item.title, url: item.url },
        ],
      },
    };
  },
  [ACTION_TYPE.REMOVE_FROM_BOOKMARKS]: (
    payload: { bookmark: BookmarkItem },
    state
  ) => {
    const { bookmark } = payload;

    return {
      ...state,
      news: {
        bookmarks: state.news.bookmarks.filter(
          (_bookmark) => _bookmark.id !== bookmark.id
        ),
      },
    };
  },
  [ACTION_TYPE.SET_LOADING]: (payload: { loading: boolean }, state) => {
    const { loading } = payload;

    return {
      ...state,
      news: {
        ...state.news,
        loading,
      },
    };
  },
  [ACTION_TYPE.FETCH_NEWS_SUCCESS]: (payload: NewsResponse, state) => {
    return {
      ...state,
      news: {
        ...state.news,
        loading: false,
        pagination: {
          pageNumber: payload.currentPage,
          pages: payload.pages,
        },
        list: payload.results,
      },
    };
  },
};
