import { FC, InputHTMLAttributes, useRef } from 'react';
import cn from 'classnames/bind';
import { useOutsideClick } from '@hooks/useOutsideClick';
import FormControl from '@components/FormControl';
import Input from '@components/Input';
import FormLabel from '@components/FormLabel';
import { ReactComponent as SearchIcon } from '@assets/icons/search.svg';
import { ReactComponent as CloseIcon } from '@assets/icons/close--small-size.svg';
import styles from './SearchBar.module.scss';

const cx = cn.bind(styles);

interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  isOpen: boolean;
  isDarkTheme?: boolean;
  setIsOpen: () => void;
  reset: () => void;
  onClose: () => void;
}

const SearchBar: FC<SearchBarProps> = ({
  isOpen,
  isDarkTheme,
  value,
  setIsOpen,
  reset,
  onClose,
  ...props
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  useOutsideClick(formRef, onClose);

  return (
    <form className={cx('search-form')} ref={formRef} onSubmit={(event) => event.preventDefault()}>
      {isOpen && (
        <FormControl isDarkTheme={isDarkTheme}>
          <Input className={cx('search-form__search-bar')} value={value} type="text" {...props} />
          <FormLabel className="visually-hidden">Artist name</FormLabel>
        </FormControl>
      )}
      <button
        className={cx('search-form__open-search-bar-button', {
          'search-form__open-search-bar-button--open-search-bar': isOpen,
        })}
        onClick={setIsOpen}
        type="button"
        disabled={isOpen}
      >
        <SearchIcon className={cx('search-form__open-search-bar-button-icon')} aria-hidden />
        <span className="visually-hidden">Open search bar</span>
      </button>
      {isOpen && value && (
        <button className={cx('search-form__reset-button')} onClick={reset} type="reset">
          <CloseIcon className={cx('search-form__reset-button-icon')} aria-hidden />
          <span className="visually-hidden">Clear search bar</span>
        </button>
      )}
    </form>
  );
};

export default SearchBar;
