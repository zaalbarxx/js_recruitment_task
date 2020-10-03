import { AppState, AsyncAction, BookmarkItem, NewsItem } from './interfaces';
import { newsApi, NewsResponse } from '../services/news';

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
  SET_CRITERIA: '[NEWS] Set Criteria',
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

export const setCriteria = ({
  page,
  section,
  searchQuery,
}: {
  page: number;
  section: string;
  searchQuery: string;
}): Action => ({
  type: ACTION_TYPE.SET_CRITERIA,
  payload: { page, section, searchQuery },
});

export const changePage = (newPage: number): AsyncAction<AppState> => async (
  getState,
  dispatch
) => {
  dispatch(setLoading(true));
  const apiResponse = await getNewsByState(getState());
  dispatch(setLoading(false));
  dispatch(updateNews(apiResponse));
};

export const changeSection = (
  newSection: string
): AsyncAction<AppState> => async (getState, dispatch) => {
  const state = getState();
  dispatch(setLoading(true));
  dispatch(
    setCriteria({
      page: state.news.pagination.pageNumber,
      section: newSection,
      searchQuery: '',
    })
  );
  const apiResponse = await getNewsByState(getState());
  dispatch(setLoading(false));
  dispatch(updateNews(apiResponse));
};

export const changeFilter = (
  searchQuery: string
): AsyncAction<AppState> => async (getState, dispatch) => {
  const state = getState();
  dispatch(setLoading(true));
  dispatch(
    setCriteria({
      page: state.news.pagination.pageNumber,
      section: state.news.section,
      searchQuery,
    })
  );
  const apiResponse = await getNewsByState(getState());
  dispatch(setLoading(false));
  dispatch(updateNews(apiResponse));
};

const getNewsByState = (state: AppState): Promise<NewsResponse> => {
  return newsApi.get({
    page: state.news.pagination.pageNumber,
    section: state.news.section,
    searchQuery: state.news.filter,
  });
}
