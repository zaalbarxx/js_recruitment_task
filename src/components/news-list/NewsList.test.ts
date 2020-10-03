import { NewsList } from './NewsList';
import { AppState, NewsItem } from '../../store/interfaces';
import { DeepPartial } from '../../shared/interfaces';
import { deepMerge } from '../../utils/deep-merge';
import { createInitialAppState, setStore } from '../../store/app-store';
import { Store } from '../../store/store';
import { queryAllByTestId, queryByTestId } from '@testing-library/dom';

const createFakeNews = (data: DeepPartial<NewsItem>): NewsItem => {
  return deepMerge(
    {
      id: '',
      url: '',
      title: '',
      publicationDate: '',
      sectionName: '',
    },
    data
  );
};

describe('NewsList', () => {
  it('should display list of news', () => {
    const div = document.createElement('div');
    setStore(new Store<AppState>(createInitialAppState({}), {}));

    const newsList = [
      createFakeNews({
        id: '1',
        title: 'title',
        url: 'https://example.com/1',
        publicationDate: new Date().toISOString(),
        sectionName: 'section',
      }),
      createFakeNews({
        id: '2',
        title: 'title2',
        url: 'https://example.com/2',
        publicationDate: new Date().toISOString(),
        sectionName: 'section',
      }),
    ];

    div.appendChild(NewsList({
      newsList,
      isLoading: false,
    }));

    expect(queryAllByTestId(div, 'news-list-item')).toHaveLength(2);
  });

  it('should display loader if loading', () => {
    const div = document.createElement('div');
    setStore(new Store<AppState>(createInitialAppState({}), {}));

    const newsList = [
      createFakeNews({
        id: '1',
        title: 'title',
        url: 'https://example.com/1',
        publicationDate: new Date().toISOString(),
        sectionName: 'section',
      }),
      createFakeNews({
        id: '2',
        title: 'title2',
        url: 'https://example.com/2',
        publicationDate: new Date().toISOString(),
        sectionName: 'section',
      }),
    ];

    div.appendChild(NewsList({
      newsList,
      isLoading: true,
    }));

    expect(queryByTestId(div, 'news-list')).toBeFalsy();
    expect(queryByTestId(div, 'news-list-loader')).toBeTruthy();
  })
});
