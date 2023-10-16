import { FC, HTMLAttributes } from 'react';
import cn from 'classnames/bind';
import styles from './ImagePlaceholder.module.scss';

const cx = cn.bind(styles);

interface ImagePlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  isDarkTheme?: boolean;
  cardType?: 'painting' | 'artist';
}

const ImagePlaceholder: FC<ImagePlaceholderProps> = ({ isDarkTheme, cardType = 'painting' }) => {
  return (
    <div
      className={cx('image-placeholder', `image-placeholder--for-${cardType}-card`, {
        'image-placeholder--dark': isDarkTheme,
      })}
    >
      <p className={cx('image-placeholder__text', `image-placeholder__text--for-${cardType}-card`)}>
        No Image uploaded
      </p>
    </div>
  );
};

export default ImagePlaceholder;
