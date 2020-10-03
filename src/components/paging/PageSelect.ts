import { el, FC } from './../el';
import { changePage } from '../../store/actions';
import { appStore } from '../../store/app-store';

interface Props {
  currentPage: number;
  totalPages: number;
}

export const PageSelect: FC<Props> = ({ currentPage, totalPages }) => {
  const items = new Array(totalPages).fill(0).map((_, index) => index + 1);

  return el('select', {
    children: items.map((pageNumber) =>
      el('option', {
        props: {
          innerText: pageNumber,
          selected: pageNumber === currentPage,
        },
      })
    ),
    props: {
      className: 'page-select',
      onchange: (ev: InputEvent) => {
        appStore.dispatch(changePage(parseInt((ev.target as any).value)));
      },
    },
  });
};
