import { FC } from 'react';
import cn from 'classnames/bind';
import { useChangeMainPaintingMutation } from '@api/features';
import TextButton from '@components/TextButton';
import { ReactComponent as ChangePaintingIcon } from '@assets/icons/change-painting.svg';
import { useViewPaintingsWindowContext } from '../ViewPaintingsWindowContext';
import styles from '../ViewPaintingsWindow.module.scss';

const cx = cn.bind(styles);

interface TheMakeTheCoverButtonProps {
  paintingId: string;
}

const TheMakeTheCoverButton: FC<TheMakeTheCoverButtonProps> = ({ paintingId }) => {
  const { artistId } = useViewPaintingsWindowContext();
  const [changeArtistMainPainting] = useChangeMainPaintingMutation();

  const makeTheCover = () =>
    changeArtistMainPainting({ artistId, data: { mainPainting: paintingId } });

  return (
    <TextButton
      className={cx('view-paintings-window__change-painting-button')}
      onClick={makeTheCover}
      isUnderlined
    >
      <span className={cx('view-paintings-window__change-painting-button-icon-wrapper')}>
        <ChangePaintingIcon className={cx('view-paintings-window__change-painting-button-icon')} />
      </span>
      <span>Make the cover</span>
    </TextButton>
  );
};

export default TheMakeTheCoverButton;
