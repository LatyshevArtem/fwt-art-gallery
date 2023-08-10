import { FC, useRef } from 'react';
import { ReactComponent as OpenedMenuButtonIcon } from '@assets/icons/close.svg';
import cn from 'classnames/bind';
import { MobileMenuProps } from './MobileMenu.props';
import Menu from '../Menu/Menu';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const MobileMenu: FC<MobileMenuProps> = ({ isDarkTheme, isOpen, onCloseButtonClick, ...props }) => {
  const sideMenuRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cx('mobile-menu', {
        'mobile-menu--open': isOpen,
        'mobile-menu--dark': isDarkTheme,
      })}
    >
      <div className={cx('side-menu')} ref={sideMenuRef}>
        <button className={cx('button')} onClick={onCloseButtonClick}>
          <OpenedMenuButtonIcon />
        </button>
        <Menu isDarkTheme={isDarkTheme} {...props} shouldShowButtonText />
      </div>
    </div>
  );
};

export default MobileMenu;
