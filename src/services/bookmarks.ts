import { BookmarkItem } from '../store/interfaces';

const BOOKMARKS_STORAGE_KEY = '@app/bookmarks';

const persist = (bookmarks: BookmarkItem[]) => {
  localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
}

const get = (): BookmarkItem[] => {
  const bookmarks = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
  return bookmarks ? JSON.parse(bookmarks) : [];
}

export const bookmarks = {
  get, persist
}
