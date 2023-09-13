import { FC, PropsWithChildren } from 'react';
import cn from 'classnames/bind';
import { ReactComponent as CloseIcon } from '@assets/icons/close--small.svg';
import styles from './Label.module.scss';

const cx = cn.bind(styles);

interface LabelProps extends PropsWithChildren {
  isDarkTheme?: boolean;
  controlLabel?: string;
  onControlClick?: () => void;
}

const Label: FC<LabelProps> = ({ children, isDarkTheme, controlLabel, onControlClick }) => {
  return (
    <span className={cx('label', { 'label--dark': isDarkTheme })}>
      {children}
      {onControlClick && (
        <button
          className={cx('label__button', { 'label__button--dark': isDarkTheme })}
          onClick={onControlClick}
          aria-label={controlLabel}
        >
          <CloseIcon />
        </button>
      )}
    </span>
  );
};

export default Label;
