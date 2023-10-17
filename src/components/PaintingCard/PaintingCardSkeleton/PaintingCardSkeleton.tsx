import { FC } from 'react';
import cn from 'classnames/bind';
import styles from './PaintingCardSkeleton.module.scss';

const cx = cn.bind(styles);

interface PaintingCardSkeletonProps {
  isDarkTheme?: boolean;
}

const PaintingCardSkeleton: FC<PaintingCardSkeletonProps> = ({ isDarkTheme }) => {
  return (
    <div className={cx('skeleton', { 'skeleton--dark': isDarkTheme })}>
      <div className={cx('skeleton__filler')} />
      <div
        className={cx('skeleton__caption-block', { 'skeleton__caption-block--dark': isDarkTheme })}
      >
        <div
          className={cx('skeleton__caption-block-line', 'skeleton__caption-block-line--first', {
            'skeleton__caption-block-line--dark': isDarkTheme,
          })}
        />
        <div
          className={cx('skeleton__caption-block-line', 'skeleton__caption-block-line--second', {
            'skeleton__caption-block-line--dark': isDarkTheme,
          })}
        />
      </div>
    </div>
  );
};

export default PaintingCardSkeleton;
