import { useContext, FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames/bind';
import { Artist } from '@schemas/Artist';
import { ThemeContex } from '@contexts/ThemeContext';
import PaintingCard from '@components/PaintingCard';
import styles from './PaintingsSection.module.scss';

const cx = cn.bind(styles);

interface PaintingsSectionProps {
  artists: Artist[];
}

const PaintingsSection: FC<PaintingsSectionProps> = ({ artists }) => {
  const { isDarkTheme } = useContext(ThemeContex);

  return (
    <section className={cx('paintings-section')}>
      <div className={cx('paintings-section__container')}>
        {artists.map((artist) => (
          <Link to={`artists/${artist._id}`} key={artist._id}>
            <PaintingCard
              isDarkTheme={isDarkTheme}
              painting={artist.mainPainting.image}
              name={artist.name}
              years={artist.yearsOfLife}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PaintingsSection;
