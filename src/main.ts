import './styles/main.css';
import { Store } from './store/store';
import { AppState } from './store/interfaces';
import { ACTION_TYPE } from './store/actions';
import { handlers } from './store/handlers';
import { NewsList } from './components/news-list/NewsList';
import { bookmarks } from './services/bookmarks';
import { newsApi } from './services/news';
import { BookmarksList } from './components/bookmarks-list/bookmarks-list';
import { appStore, createInitialAppState, setStore } from './store/app-store';
import { SectionSelect } from './components/filtering/SectionSelect';
import { PageSelect } from './components/filtering/PageSelect';
import { SearchInput } from './components/filtering/SearchInput';

const renderApp = (state: AppState): void => {
  const rootNodes = [
    document.querySelector('#newsList'),
    document.querySelector('#bookmarksList'),
    document.querySelector('#activePageSelect'),
    document.querySelector('#sectionSelect'),
    document.querySelector('#searchQueryInput'),
  ];
  const [
    newsList,
    bookmarksList,
    activePage,
    sectionSelect,
    searchQueryInput,
  ] = rootNodes;
  rootNodes.forEach((node) => (node ? (node.innerHTML = '') : ''));

  newsList!.appendChild(
    NewsList({ newsList: state.news.list, isLoading: state.news.loading })
  );
  bookmarksList!.appendChild(
    BookmarksList({ bookmarksList: state.news.bookmarks })
  );
  activePage!.appendChild(
    PageSelect({
      currentPage: state.news.pagination.pageNumber,
      totalPages: state.news.pagination.size,
    })
  );
  sectionSelect!.appendChild(
    SectionSelect({
      selectedSection: state.news.section,
    })
  );

  searchQueryInput!.appendChild(SearchInput({ inputValue: state.news.filter }));
  // document.querySelector('#activePageSelectColumn')!.innerHTML = ActivePageSelect(pages, currentPage);
  // document.querySelector('#readLaterListColumn')!.innerHTML = ReadLaterList(
  //   bookmarkedNews
  // );
};

window.onload = async () => {
  const { results, pages, currentPage } = await newsApi.get();
  const savedBookmarks = bookmarks.get();

  setStore(
    new Store<AppState>(
      createInitialAppState({
        news: {
          list: results,
          pagination: {
            pageNumber: currentPage,
            size: 10,
            pages,
          },
          bookmarks: savedBookmarks,
        },
      }),
      handlers
    )
  );

  renderApp(appStore.getState());

  appStore.on(ACTION_TYPE.STATE_UPDATED, (state: AppState) => {
    bookmarks.persist(state.news.bookmarks);
    renderApp(state);
  });
};
