import { FC, PropsWithChildren } from 'react';
import cn from 'classnames/bind';
import styles from './PaintingsGrid.module.scss';

const cx = cn.bind(styles);

interface GridProps extends PropsWithChildren {
  className?: string;
}

const PaintingsGrid: FC<GridProps> = ({ children, className }) => {
  return <div className={cx(className, 'paintings-grid')}>{children}</div>;
};

export default PaintingsGrid;
