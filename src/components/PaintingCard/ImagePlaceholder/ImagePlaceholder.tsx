import { FC } from 'react';
import cn from 'classnames/bind';
import styles from './ImagePlaceholder.module.scss';

const cx = cn.bind(styles);

interface ImagePlaceholderProps {
  className: string;
  isDarkTheme?: boolean;
}

const ImagePlaceholder: FC<ImagePlaceholderProps> = ({ className, isDarkTheme }) => {
  return (
    <div className={className}>
      <p
        className={cx('image-placeholder__text', { 'image-placeholder__text--dark': isDarkTheme })}
      >
        No Image uploaded
      </p>
    </div>
  );
};

export default ImagePlaceholder;
