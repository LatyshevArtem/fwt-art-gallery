import { FC, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import cn from 'classnames/bind';
import 'swiper/css/bundle';
import { Painting } from '@schemas/Painting';
import { useMatchMedia } from '@hooks/useMatchMedia';
import { useThemeContext } from '@hooks/useThemeContext';
import Picture from '@components/Picture';
import NavigationButton from './NavigationButton';
import TheMakeTheCoverButton from './TheMakeTheCoverButton';
import EditPaintingButton from './EditPaintingButton';
import DeletePaintingButton from './DeletePaintingButton';
import styles from '../ViewPaintingsWindow.module.scss';

const cx = cn.bind(styles);

interface SliderProps {
  initialSlideNumber: number;
  paintings: Painting[];
}

const Slider: FC<SliderProps> = ({ initialSlideNumber, paintings }) => {
  const [swiperActiveIndex, setSwiperActiveIndex] = useState(initialSlideNumber);
  const { isMobile } = useMatchMedia();
  const { isDarkTheme } = useThemeContext();

  const changeSwiperActiveIndex = (swiper: SwiperClass) => setSwiperActiveIndex(swiper.activeIndex);

  return (
    <Swiper
      className={cx('view-paintings-window__slider')}
      modules={[Navigation]}
      navigation={{
        prevEl: `.${cx('view-paintings-window__slider-navigation-buttons--prev')}`,
        nextEl: `.${cx('view-paintings-window__slider-navigation-buttons--next')}`,
      }}
      slidesPerView={1}
      spaceBetween={0}
      initialSlide={swiperActiveIndex}
      onActiveIndexChange={changeSwiperActiveIndex}
    >
      {!isMobile && (
        <>
          <NavigationButton
            className={cx(
              'view-paintings-window__slider-navigation-buttons',
              'view-paintings-window__slider-navigation-buttons--prev',
            )}
            text="Previous slide"
          />
          <NavigationButton
            className={cx(
              'view-paintings-window__slider-navigation-buttons',
              'view-paintings-window__slider-navigation-buttons--next',
            )}
            text="Next slide"
          />
        </>
      )}
      {paintings.map((painting) => (
        <SwiperSlide className={cx('view-paintings-window__slide')} key={painting._id}>
          <figure className={cx('view-paintings-window__painting-card')}>
            <TheMakeTheCoverButton paintingId={painting._id} />
            <Picture className={cx('view-paintings-window__painting')} image={painting.image} />
            <figcaption
              className={cx('view-paintings-window__caption-block', {
                'view-paintings-window__caption-block--dark': isDarkTheme,
              })}
            >
              {!isMobile && (
                <div className={cx('view-paintings-window__controls')}>
                  <EditPaintingButton
                    className={cx('view-paintings-window__control')}
                    painting={painting}
                  />
                  <DeletePaintingButton
                    className={cx('view-paintings-window__control')}
                    paintingId={painting._id}
                  />
                </div>
              )}
              <time
                className={cx('view-paintings-window__year-of-creation', {
                  'view-paintings-window__year-of-creation--dark': isDarkTheme,
                })}
              >
                {painting.yearOfCreation}
              </time>
              <cite
                className={cx('view-paintings-window__name', {
                  'view-paintings-window__name--dark': isDarkTheme,
                })}
              >
                {painting.name}
              </cite>
            </figcaption>
          </figure>
          {isMobile && (
            <div className={cx('view-paintings-window__controls')}>
              <EditPaintingButton painting={painting} isOverImage />
              <DeletePaintingButton paintingId={painting._id} isOverImage />
            </div>
          )}
          <div className={cx('view-paintings-window__slide-counter')}>
            {swiperActiveIndex + 1}/{paintings.length}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
