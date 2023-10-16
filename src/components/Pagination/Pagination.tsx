import { FC } from 'react';
import cn from 'classnames/bind';
import { ReactComponent as ArrowIcon } from '@assets/icons/arrow-as-triangle--default-size.svg';
import { getPageNumbers } from './getArrayToRender';
import PaginationButton from './PaginationButton';
import Ellipsis from './Ellipsis';
import styles from './Pagination.module.scss';

const cx = cn.bind(styles);

interface PaginationProps {
  className?: string;
  isDarkTheme?: boolean;
  current: number;
  total: number;
  onChange: (pageNumber: number) => void;
}

const Pagination: FC<PaginationProps> = ({ className, isDarkTheme, current, total, onChange }) => {
  const goToPrevPage = () => onChange(current - 1);

  const goToNextPage = () => onChange(current + 1);

  const pageNumbers = getPageNumbers(total, current);

  return (
    <ul className={cx(className, 'pagination')}>
      <li>
        <PaginationButton
          className={cx('pagination__icon-button', 'pagination__icon-button--back')}
          onClick={goToPrevPage}
          disabled={current === 1}
        >
          <ArrowIcon
            className={cx('pagination__button-icon', {
              'pagination__button-icon--dark': isDarkTheme,
            })}
            aria-hidden
          />
          <span className="visually-hidden">Previous page</span>
        </PaginationButton>
      </li>
      {total > 7 && current > 3 && (
        <>
          <PaginationButton
            className={cx('pagination__number-button', {
              'pagination__number-button--dark': isDarkTheme,
            })}
            onClick={() => onChange(1)}
          >
            1
          </PaginationButton>
          <Ellipsis isDarkTheme={isDarkTheme} />
        </>
      )}
      {pageNumbers.map((value) => (
        <li>
          <PaginationButton
            className={cx('pagination__number-button', {
              'pagination__number-button--selected': current === value,
              'pagination__number-button--dark': isDarkTheme,
            })}
            onClick={() => onChange(value)}
          >
            {value}
          </PaginationButton>
        </li>
      ))}
      {total > 7 && current < total - 2 && (
        <>
          <Ellipsis isDarkTheme={isDarkTheme} />
          <PaginationButton
            className={cx('pagination__number-button', {
              'pagination__number-button--dark': isDarkTheme,
            })}
            onClick={() => onChange(total)}
          >
            {total}
          </PaginationButton>
        </>
      )}
      <li>
        <PaginationButton
          className={cx('pagination__icon-button')}
          onClick={goToNextPage}
          disabled={current === total}
        >
          <ArrowIcon
            className={cx('pagination__button-icon', {
              'pagination__button-icon--dark': isDarkTheme,
            })}
            aria-hidden
          />
          <span className="visually-hidden">Next page</span>
        </PaginationButton>
      </li>
    </ul>
  );
};

export default Pagination;
