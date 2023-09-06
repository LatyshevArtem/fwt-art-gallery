import { FC } from 'react';
import cn from 'classnames/bind';
import Picture from '@components/Picture';
import { ReactComponent as ArrowIcon } from '@assets/icons/arrow.svg';
import { Image } from '@schemas/Image';
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
        <div
          className={cx('painting-card__without-image', {
            'painting-card__without-image--dark': isDarkTheme,
          })}
        >
          <p className={cx('without-image__text', { 'without-image__text--dark': isDarkTheme })}>
            No Image uploaded
          </p>
        </div>
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
