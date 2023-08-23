import cn from 'classnames/bind';
import { useThemeContext } from '@hooks/useThemeContext';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const Preloader = () => {
  const { isDarkTheme } = useThemeContext();

  return (
    <svg className={cx('preloader')}>
      <circle
        className={cx('preloader__circle', { 'preloader__circle--dark': isDarkTheme })}
        cx="50%"
        cy="50%"
        r="22.5"
      />
      <circle
        className={cx('preloader__circle', { 'preloader__circle--dark': isDarkTheme })}
        cx="50%"
        cy="50%"
        r="22.5"
      />
      <circle
        className={cx('preloader__circle', { 'preloader__circle--dark': isDarkTheme })}
        cx="50%"
        cy="50%"
        r="22.5"
      />
      <circle
        className={cx('preloader__circle', { 'preloader__circle--dark': isDarkTheme })}
        cx="50%"
        cy="50%"
        r="22.5"
      />
    </svg>
  );
};

export default Preloader;
