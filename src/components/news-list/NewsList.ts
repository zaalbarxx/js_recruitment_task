import { el, FC, RefCreated } from './../el';
import { NewsItem } from '../../store/interfaces';
import { NewsListItem } from './NewsListItem';
import './NewsList.css';

interface Props {
  newsList: NewsItem[];
  isLoading: boolean;
}

export const NewsList: FC<Props> = ({ newsList, isLoading }) => {
  return el('div', {
    children: [
      !isLoading
        ? el('ul', {
            children: newsList.map((news, index) =>
              NewsListItem({
                news,
                withSeparator: index !== newsList.length - 1,
              })
            ),
            props: {
              className: 'news-list',
              [RefCreated]: (el: HTMLElement) =>
                (el.dataset.testid = 'news-list'),
            },
          })
        : null,
      isLoading
        ? el('div', {
            props: {
              className: 'news-list--loading',
              innerText: 'Loading...',
              [RefCreated]: (el: HTMLElement) =>
                (el.dataset.testid = 'news-list-loader'),
            },
          })
        : null,
    ],
  });
};
