import { FC, useContext } from 'react';
import cn from 'classnames/bind';
import { ThemeContex } from '@contexts/ThemeContext';
import MainPageCard from '@components/MainPageCard';
import { PaintingsSectionProps } from './PaintingsSection.props';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const PaintingsSection: FC<PaintingsSectionProps> = ({ paintings }) => {
  const { isDarkTheme } = useContext(ThemeContex);

  return (
    <section className={cx('paintings-section', { 'paintings-section--dark': isDarkTheme })}>
      <div className={cx('paintings-section__container')}>
        {paintings.map((painting) => (
          <MainPageCard isDarkTheme={isDarkTheme} {...painting} />
        ))}
      </div>
    </section>
  );
};

export default PaintingsSection;
