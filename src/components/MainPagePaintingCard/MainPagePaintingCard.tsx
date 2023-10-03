import { FC } from 'react';
import { Link } from 'react-router-dom';
import PaintingCard from '@components/PaintingCard';
import { Painting } from '@schemas/Painting';

interface MainPagePaintingCardProps {
  isDarkTheme?: boolean;
  artistId: string;
  mainPainting?: Painting | null;
  name: string;
  yearsOfLife: string;
}

const MainPagePaintingCard: FC<MainPagePaintingCardProps> = ({
  isDarkTheme,
  artistId,
  mainPainting,
  name,
  yearsOfLife,
}) => {
  return (
    <Link to={`artists/${artistId}`}>
      <PaintingCard
        isDarkTheme={isDarkTheme}
        image={mainPainting?.image}
        name={name}
        date={yearsOfLife}
      />
    </Link>
  );
};

export default MainPagePaintingCard;
