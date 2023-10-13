import { FC } from 'react';
import cn from 'classnames/bind';
import Picture from '@components/Picture/Picture';
import ImagePlaceholder from '@components/ImagePlaceholder';
import Accordion from '@components/TextAccordion';
import { ArtistById } from '@schemas/ArtistById';
import styles from './ArtistCard.module.scss';

const cx = cn.bind(styles);

const CROP_TEXT_LENGTH = 100;

interface ArtistCardProps {
  isDarkTheme?: boolean;
  artist: ArtistById;
}

const ArtistCard: FC<ArtistCardProps> = ({ isDarkTheme, artist }) => {
  const { avatar, yearsOfLife, name, description, genres } = artist;

  const shouldShowCaptionBlock = Boolean(yearsOfLife || name || description || genres.length);

  return (
    <figure className={cx('artist-card', { 'artist-card--dark': isDarkTheme })}>
      {avatar ? (
        <Picture className={cx('artist-card__image')} image={avatar} />
      ) : (
        <ImagePlaceholder isDarkTheme={isDarkTheme} cardType="artist" />
      )}
      {shouldShowCaptionBlock && (
        <figcaption className={cx('artist-card__caption-block')}>
          <div className={cx('artist-card__brief-info')}>
            <p
              className={cx('artist-card__years-of-life', {
                'artist-card__years-of-life--dark': isDarkTheme,
              })}
            >
              {yearsOfLife}
            </p>
            <p className={cx('artist-card__name', { 'artist-card__name--dark': isDarkTheme })}>
              {name}
            </p>
          </div>
          <div className={cx('artist-card__info')}>
            {description &&
              (description.length > CROP_TEXT_LENGTH ? (
                <Accordion
                  className={cx('artist-card__biography', {
                    'artist-card__biography--dark': isDarkTheme,
                  })}
                  isDarkTheme={isDarkTheme}
                  text={description}
                  cropTextLength={CROP_TEXT_LENGTH}
                />
              ) : (
                <div
                  className={cx('artist-card__biography', {
                    'artist-card__biography--dark': isDarkTheme,
                  })}
                >
                  {description}
                </div>
              ))}
            {genres.length !== 0 && (
              <ul className={cx('artist-card__genres')}>
                {genres.map((genre) => (
                  <li
                    className={cx('artist-card__genre', {
                      'artist-card__genre--dark': isDarkTheme,
                    })}
                    key={genre._id}
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </figcaption>
      )}
    </figure>
  );
};

export default ArtistCard;
