import { ButtonHTMLAttributes, FC } from 'react';
import cn from 'classnames/bind';
import styles from './Pagination.module.scss';

const cx = cn.bind(styles);

interface PaginationButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {}

const PaginationButton: FC<PaginationButtonProps> = ({ className, ...props }) => {
  return <button className={cx(className, 'pagination__button')} type="button" {...props} />;
};

export default PaginationButton;
