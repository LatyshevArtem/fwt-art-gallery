import { FC, PropsWithChildren } from 'react';
import cn from 'classnames/bind';
import styles from './FilterItem.module.scss';

const cx = cn.bind(styles);

interface FilterItemProps extends PropsWithChildren {
  className?: string;
  isDarkTheme?: boolean;
  isSelected: boolean;
}

const FilterItem: FC<FilterItemProps> = ({ children, className, isDarkTheme, isSelected }) => {
  return (
    <span
      className={cx(className, 'filter-item', {
        'filter-item--selected': isSelected,
        'filter-item--dark': isDarkTheme,
      })}
    >
      {children}
    </span>
  );
};

export default FilterItem;
