import { FC } from 'react';
import { ReactComponent as ArrowIcon } from '@assets/icons/arrow.svg';
import cn from 'classnames/bind';
import { MainPageCardProps } from './MainPageCard.props';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const MainPageCard: FC<MainPageCardProps> = ({ imgSrc, name, years, isDarkTheme }) => {
  return (
    <figure className={cx('card')}>
      <img className={cx('card__image')} src={imgSrc} alt="" />
      <figcaption className={cx('figcaption', { 'figcaption--dark': isDarkTheme })}>
        <p className={cx('figcaption__name')}>{name}</p>
        <p className={cx('figcaption__date')}>{years}</p>
        <div className={cx('figcaption__arrow-block')}>
          <ArrowIcon />
        </div>
      </figcaption>
    </figure>
  );
};

export default MainPageCard;
