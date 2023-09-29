import { FC } from 'react';
import { Link } from 'react-router-dom';
import PaintingCard, { PaintingCardProps } from '@components/PaintingCard';

interface MainPagePaintingCardProps extends PaintingCardProps {
  artistId: string;
}

const MainPagePaintingCard: FC<MainPagePaintingCardProps> = ({ artistId, ...cardProps }) => {
  return (
    <Link to={`artists/${artistId}`}>
      <PaintingCard {...cardProps} />
    </Link>
  );
};

export default MainPagePaintingCard;
