import { el, FC } from '../el';
import { debounce } from '../../utils/debounce';
import { appStore } from '../../store/app-store';
import { changeFilter } from '../../store/actions';

interface Props {
  inputValue: string;
}

export const SearchInput: FC<Props> = ({ inputValue }) => {
  const onChange = debounce((event: Event) => {
    appStore.dispatch(changeFilter((event.target as any).value));
  }, 1000);

  return el('input', {
    props: {
      type: 'search',
      placeholder: 'News content search',
      value: inputValue,
      onkeyup: onChange,
    },
  });
};
