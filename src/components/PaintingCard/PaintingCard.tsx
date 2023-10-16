import { FC } from 'react';
import cn from 'classnames/bind';
import { Image } from '@schemas/Image';
import Picture from '@components/Picture';
import ImagePlaceholder from '@components/ImagePlaceholder';
import { ReactComponent as ArrowIcon } from '@assets/icons/arrow.svg';
import styles from './PaintingCard.module.scss';

const cx = cn.bind(styles);

interface PaintingCardProps {
  isDarkTheme?: boolean;
  image?: Image | null;
  name: string;
  date: string;
}

const PaintingCard: FC<PaintingCardProps> = ({ isDarkTheme, image, name, date }) => {
  return (
    <figure className={cx('card')}>
      {image ? (
        <Picture className={cx('card__image')} image={image} />
      ) : (
        <ImagePlaceholder isDarkTheme={isDarkTheme} />
      )}
      <figcaption
        className={cx('card__caption-block', { 'card__caption-block--dark': isDarkTheme })}
      >
        <p className={cx('card__name', { 'card__name--dark': isDarkTheme })}>{name}</p>
        <p className={cx('card__date', { 'card__date--dark': isDarkTheme })}>{date}</p>
        <div className={cx('card__arrow-block', { 'card__arrow-block--dark': isDarkTheme })}>
          <ArrowIcon className={cx('card__arrow-block-icon')} />
        </div>
      </figcaption>
    </figure>
  );
};

export default PaintingCard;
