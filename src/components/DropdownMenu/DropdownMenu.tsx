import { FC, useRef } from 'react';
import cn from 'classnames/bind';
import { useOutsideClick } from '@hooks/useOutsideClick';
import styles from './DropdownMenu.module.scss';

const cx = cn.bind(styles);

export interface DropdownMenuOptionType {
  name: string;
  onClick: () => void;
}

interface DropdownMenuProps {
  className?: string;
  isDarkTheme?: boolean;
  options: DropdownMenuOptionType[];
  onClose: () => void;
}

const DropdownMenu: FC<DropdownMenuProps> = ({ className, isDarkTheme, options, onClose }) => {
  const dropdownMenuRef = useRef<HTMLUListElement>(null);

  useOutsideClick(dropdownMenuRef, onClose);

  return (
    <ul
      className={cx(className, 'dropdown-menu', { 'dropdown-menu--dark': isDarkTheme })}
      ref={dropdownMenuRef}
    >
      {options.map((option) => (
        <li>
          <button
            className={cx('dropdown-menu__option', {
              'dropdown-menu__option--dark': isDarkTheme,
            })}
            onClick={option.onClick}
          >
            {option.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default DropdownMenu;
