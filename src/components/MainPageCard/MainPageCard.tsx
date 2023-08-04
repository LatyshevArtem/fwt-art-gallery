import { FC } from 'react';
import { ReactComponent as ArrowIcon } from '@assets/icons/arrow.svg';
import cn from 'classnames/bind';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export interface MainPageCardProps {
  imgSrc: string;
  name: string;
  years: string;
  isDarkTheme?: boolean;
}

const MainPageCard: FC<MainPageCardProps> = ({ imgSrc, name, years, isDarkTheme }) => {
  return (
    <figure className={cx('card')}>
      <img
        className={cx('card__image')}
        src="https://internship-front.framework.team/images/64761919c25ef9fb3e0cdb95/image.jpg"
        alt=""
      />
      {imgSrc}
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
