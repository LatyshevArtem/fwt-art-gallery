import { FC } from 'react';
import cn from 'classnames/bind';
import styles from './ModalBackdrop.module.scss';

const cx = cn.bind(styles);

interface ModalBackdropProps {
  className?: string;
}

const ModalBackdrop: FC<ModalBackdropProps> = ({ className }) => {
  return <div className={cx(className, 'modal-backdrop')} />;
};

export default ModalBackdrop;
