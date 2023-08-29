import { FC, PropsWithChildren } from 'react';
import cn from 'classnames/bind';
import styles from './PaintingsGrid.module.scss';

const cx = cn.bind(styles);

interface PaintingsGridProps extends PropsWithChildren {
  className?: string;
}

const PaintingsGrid: FC<PaintingsGridProps> = ({ children, className }) => {
  return <ul className={cx(className, 'paintings-grid')}>{children}</ul>;
};

export default PaintingsGrid;
