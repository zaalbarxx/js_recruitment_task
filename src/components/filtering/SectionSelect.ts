import { changeSection } from '../../store/actions';
import { el, FC } from '../el';
import { appStore } from '../../store/app-store';

interface Props {
  selectedSection: string;
}

const SECTIONS = ['sport', 'books', 'business', 'culture'];

export const SectionSelect: FC<Props> = ({ selectedSection }) => {
  return el('select', {
    children: ['all', ...SECTIONS].map((section) =>
      el('option', {
        props: {
          innerText: section,
          selected: section === selectedSection,
        },
      })
    ),
    props: {
      className: 'section-select',
      onchange: (ev: InputEvent) => {
        const value = (ev.target as any).value;
        appStore.dispatch(changeSection(value !== 'all' ? value : ''));
      },
    },
  });
};
