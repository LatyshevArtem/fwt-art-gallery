import { FC } from 'react';
import cn from 'classnames/bind';
import Picture from '@components/Picture';
import { ReactComponent as ArrowIcon } from '@assets/icons/arrow.svg';
import { Image } from '@schemas/Image';
import ImagePlaceholder from './ImagePlaceholder';
import styles from './PaintingCard.module.scss';

const cx = cn.bind(styles);

interface PaintingCardProps {
  isDarkTheme?: boolean;
  painting?: Image;
  name: string;
  date: string;
}

const PaintingCard: FC<PaintingCardProps> = ({ isDarkTheme, painting, name, date }) => {
  return (
    <figure className={cx('painting-card')}>
      {painting ? (
        <Picture className={cx('painting-card__image')} {...painting} />
      ) : (
        <ImagePlaceholder
          className={cx('painting-card__image-placeholder', {
            'painting-card__image-placeholder--dark': isDarkTheme,
          })}
          isDarkTheme={isDarkTheme}
        />
      )}
      <figcaption className={cx('figcaption', { 'figcaption--dark': isDarkTheme })}>
        <p className={cx('figcaption__name')}>{name}</p>
        <p className={cx('figcaption__date')}>{date}</p>
        <div className={cx('figcaption__arrow-block')}>
          <ArrowIcon className={cx('figcaption__arrow-icon')} />
        </div>
      </figcaption>
    </figure>
  );
};

export default PaintingCard;
