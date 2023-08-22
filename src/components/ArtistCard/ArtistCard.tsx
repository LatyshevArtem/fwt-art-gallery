import { FC } from 'react';
import cn from 'classnames/bind';
import { useThemeContext } from '@hooks/useThemeContext';
import Picture from '@components/Picture/Picture';
import Accordion from '@components/TextAccordion';
import { ArtistById } from '@schemas/ArtistById';
import styles from './ArtistCard.module.scss';

const cx = cn.bind(styles);

const CROP_TEXT_LENGTH = 100;

interface ArtistCardProps {
  artist: ArtistById;
}

const ArtistCard: FC<ArtistCardProps> = ({ artist }) => {
  const { avatar, yearsOfLife, name, description, genres } = artist;
  const { isDarkTheme } = useThemeContext();

  return (
    <figure className={cx('artist-card', { 'artist-card--dark': isDarkTheme })}>
      <Picture className={cx('artist-card__image')} {...avatar} />
      <figcaption className={cx('artist-card__figcaption')}>
        <div className={cx('figcaption__brief-info')}>
          <p
            className={cx('brief-info__years-of-life', {
              'brief-info__years-of-life--dark': isDarkTheme,
            })}
          >
            {yearsOfLife}
          </p>
          <p className={cx('brief-info__name', { 'brief-info__name--dark': isDarkTheme })}>
            {name}
          </p>
        </div>
        <div className={cx('figcaption__info')}>
          {description.length > CROP_TEXT_LENGTH ? (
            <Accordion
              isDarkTheme={isDarkTheme}
              textClassName={cx('info__description', { 'info__description--dark': isDarkTheme })}
              text={description}
              cropTextLength={CROP_TEXT_LENGTH}
            />
          ) : (
            <div className={cx('info__description', { 'info__description--dark': isDarkTheme })}>
              {description}
            </div>
          )}
          <ul className={cx('info__genres')}>
            {genres.map((genre) => (
              <li
                className={cx('info__genre', { 'info__genre--dark': isDarkTheme })}
                key={genre._id}
              >
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
      </figcaption>
    </figure>
  );
};

export default ArtistCard;
