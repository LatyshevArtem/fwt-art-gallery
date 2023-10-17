import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import PaintingCard, { PaintingCardSkeleton } from '@components/PaintingCard';
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
  const { ref, inView } = useInView({ threshold: 0, triggerOnce: true });

  return (
    <Link ref={ref} to={`artists/${artistId}`}>
      {inView ? (
        <PaintingCard
          isDarkTheme={isDarkTheme}
          image={mainPainting?.image}
          name={name}
          date={yearsOfLife}
        />
      ) : (
        <PaintingCardSkeleton isDarkTheme={isDarkTheme} />
      )}
    </Link>
  );
};

export default MainPagePaintingCard;
