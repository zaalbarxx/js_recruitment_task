import { el, FC } from './../el';
import { BookmarkItem } from '../../store/interfaces';
import { removeFromBookmarks } from '../../store/actions';
import { appStore } from '../../store/app-store';

interface Props {
  bookmarksList: BookmarkItem[];
}

interface BookmarkItemProps {
  bookmark: BookmarkItem;
}

const BookmarkItemComponent: FC<BookmarkItemProps> = ({ bookmark }) => {
  return el('li', {
    props: { className: 'bookmarks-list--item' },
    children: [
      el('h4', { props: { className: 'readLaterItem-title', innerText: bookmark.title }}),
      el('section', {
        children: [
          el('a', {
            props: {
              href: bookmark.url,
              innerText: 'Read',
              className: 'button',
              target: '_blank',
            },
          }),
          el('button', {
            props: {
              className: 'button button-clear',
              innerText: 'Remove',
              onclick: () => {
                appStore.dispatch(removeFromBookmarks(bookmark));
              },
            },
          }),
        ]
      })
    ]
  })
}

export const BookmarksList: FC<Props> = ({ bookmarksList }) => {
  return el('ul', {
    children: bookmarksList.map((bookmark) => BookmarkItemComponent({ bookmark })),
    props: { className: 'bookmarks-list' },
  });
};
