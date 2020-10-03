import { el, FC, RefCreated } from '../el';
import { NewsItem } from '../../store/interfaces';
import { addToBookmarks } from '../../store/actions';
import { formatDate } from './utils/format-date';
import { appStore } from '../../store/app-store';

interface ItemHeaderProps {
  title: string;
}

const ItemHeader: FC<ItemHeaderProps> = ({ title }) =>
  el('h2', { props: { className: 'news-list-header', innerText: title } });

interface ItemDetailsProps {
  sectionName: string;
  publicationDate: string;
}

export const ItemDetails: FC<ItemDetailsProps> = ({
  sectionName,
  publicationDate,
}) => {
  return el('section', {
    props: { className: 'newsDetails' },
    children: [
      el('ul', {
        children: [
          el('li', {
            children: [
              el('strong', { props: { innerText: 'Section Name: ' } }),
              el('span', { props: { innerText: sectionName } }),
            ],
          }),
          el('li', {
            children: [
              el('strong', {
                props: { innerText: 'Publication Date: ' },
              }),
              el('span', { props: { innerText: publicationDate } }),
            ],
          }),
        ],
      }),
    ],
  });
};

interface ItemActionProps {
  news: NewsItem;
}

export const NewsListItemAction: FC<ItemActionProps> = ({ news }) => {
  const isInBookmarks = appStore
    .getState()
    .news.bookmarks.find((bookmark) => bookmark.id === news.id);

  return el('section', {
    children: [
      el('a', {
        props: {
          href: news.url,
          innerText: 'Read more',
          className: 'button',
          target: '_blank',
        },
      }),
      el('button', {
        props: {
          id: `news-list-item__actions__save--${news.id}`,
          className: 'button button-clear',
          disabled: isInBookmarks,
          innerText: isInBookmarks ? 'Saved' : 'Save',
          onclick: () => {
            if (isInBookmarks) {
              return;
            }

            appStore.dispatch(addToBookmarks(news));
          },
        },
      }),
    ],
    props: { className: 'newsActions' },
  });
};

interface NewsListItemProps {
  news: NewsItem;
  withSeparator: boolean;
}

export const NewsListItem: FC<NewsListItemProps> = ({
  news,
  withSeparator,
}) => {
  return el('li', {
    children: [
      el('article', {
        children: [
          ItemHeader({ title: news.title }),
          ItemDetails({
            sectionName: news.sectionName,
            publicationDate: formatDate(news.publicationDate),
          }),
          NewsListItemAction({ news }),
        ],
        props: {
          className: 'news-list-item',
          [RefCreated]: (el: HTMLElement) => (el.dataset.testid = 'news-list-item'),
        },
      }),
      withSeparator
        ? el('div', { props: { className: 'news-list--separator' } })
        : null,
    ],
  });
};
