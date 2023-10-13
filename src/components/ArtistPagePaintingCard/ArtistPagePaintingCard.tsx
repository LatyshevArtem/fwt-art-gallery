import { FC } from 'react';
import cn from 'classnames/bind';
import { Painting } from '@schemas/Painting';
import PaintingCard from '@components/PaintingCard';
import PaintingContextMenuButton from './ContextMenuButton';
import styles from './ArtistPagePaintingCard.module.scss';

const cx = cn.bind(styles);

interface ArtistPagePaintingCardProps {
  isAuth: boolean | null;
  isDarkTheme?: boolean;
  artistId: string;
  mainPaintingId: string;
  painting: Painting;
  onClick: () => void;
}

const ArtistPagePaintingCard: FC<ArtistPagePaintingCardProps> = ({
  isAuth,
  isDarkTheme,
  artistId,
  painting,
  mainPaintingId,
  onClick,
}) => {
  const { _id: paintingId, yearOfCreation, ...restPaintingData } = painting;
  const contextMenuButtonProps = {
    isDarkTheme,
    isTheCover: paintingId === mainPaintingId,
    artistId,
    painting,
  };

  return (
    <div className={cx('artist-page-painting-card')}>
      <PaintingCard isDarkTheme={isDarkTheme} date={yearOfCreation} {...restPaintingData} />
      <button
        className={cx('artist-page-painting-card__open-view-paintings-window-button')}
        onClick={onClick}
      >
        Open full-screen painting viewing mode
      </button>
      {isAuth && <PaintingContextMenuButton {...contextMenuButtonProps} />}
    </div>
  );
};

export default ArtistPagePaintingCard;
