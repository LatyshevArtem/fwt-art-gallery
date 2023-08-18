import { FC } from 'react';
import cn from 'classnames/bind';
import { Image } from '@schemas/Image';
import Picture from '@components/Picture';
import { ReactComponent as ArrowIcon } from '@assets/icons/arrow.svg';
import styles from './PaintingCard.module.scss';

const cx = cn.bind(styles);

interface PaintingCardProps {
  isDarkTheme?: boolean;
  painting: Image;
  name: string;
  years: string;
}

const PaintingCard: FC<PaintingCardProps> = ({ isDarkTheme, painting, name, years }) => {
  return (
    <figure className={cx('painting-card')}>
      <Picture className={cx('painting-card__image')} {...painting} />
      <figcaption className={cx('figcaption', { 'figcaption--dark': isDarkTheme })}>
        <p className={cx('figcaption__name')}>{name}</p>
        <p className={cx('figcaption__date')}>{years}</p>
        <div className={cx('figcaption__arrow-block')}>
          <ArrowIcon className={cx('figcaption__arrow-icon')} />
        </div>
      </figcaption>
    </figure>
  );
};

export default PaintingCard;
