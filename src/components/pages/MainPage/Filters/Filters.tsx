import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames/bind';
import { useAppSelector } from '@hooks/useAppSelector';
import {
  selectArtistsFilters,
  setOrderBy,
  setGenres,
} from '@store/features/artistsFilters/artistsFiltersSlice';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useBoolean } from '@hooks/useBoolean';
import { useMatchMedia } from '@hooks/useMatchMedia';
import { useFetchGenresQuery } from '@api/features';
import Modal, { ModalBackdrop, ModalContent, ModalCloseButton } from '@components/Modal';
import FieldsetName from '@components/FieldsetName';
import FilterItem from '@components/FilterItem';
import TextButton from '@components/TextButton';
import styles from './Filters.module.scss';

const cx = cn.bind(styles);

const ANIMATION_TIME = 500;

interface FormValues {
  genresIds: string[];
  orderBy: 'asc' | 'desc' | 'auto';
}

interface FiltersSidePageProps {
  isOpen: boolean;
  isDarkTheme?: boolean;
  onSubmit: (sortingOption: 'asc' | 'desc' | null, genresIds: string[]) => void;
  onClose: () => void;
}

const FiltersSidePage: FC<FiltersSidePageProps> = ({ isOpen, isDarkTheme, onSubmit, onClose }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useAppSelector(selectArtistsFilters);
  const dispatch = useAppDispatch();
  const { register, getValues, handleSubmit, reset, watch } = useForm<FormValues>({
    defaultValues: { genresIds: filters.genres || [], orderBy: filters.orderBy || 'auto' },
  });

  const [isMount, setIsMount] = useBoolean();
  const { isMobile } = useMatchMedia();
  const [isGenresListOpen, setIsGenresListOpen] = useBoolean();
  const [isSortingOptionsListOpen, setIsSortingOptionsListOpen] = useBoolean();
  const { data: genres = [] } = useFetchGenresQuery(undefined);

  const sortingOptions = [
    { name: 'Auto', key: 'auto' },
    { name: 'A-Z', key: 'asc' },
    { name: 'Z-A', key: 'desc' },
  ];

  watch();

  const onFiltersFormSubmit: SubmitHandler<FormValues> = ({ orderBy, genresIds }) => {
    if (orderBy !== 'auto') {
      searchParams.set('sortBy', 'name');
      searchParams.set('orderBy', orderBy);
      dispatch(setOrderBy(orderBy));
    } else {
      searchParams.delete('sortBy');
      searchParams.delete('orderBy');
      dispatch(setOrderBy(null));
    }

    if (genresIds.length !== 0) {
      searchParams.set('genres', genresIds.toString());
      dispatch(setGenres(genresIds));
    } else {
      searchParams.delete('genres');
      dispatch(setGenres(null));
    }

    setSearchParams(searchParams);
    onSubmit(orderBy === 'auto' ? null : orderBy, genresIds);
  };

  const handleReset = () => {
    searchParams.delete('sortBy');
    searchParams.delete('orderBy');
    searchParams.delete('genres');
    dispatch(setOrderBy(null));
    dispatch(setGenres(null));
    setSearchParams(searchParams);
    reset({ orderBy: 'auto', genresIds: [] });
    onSubmit(null, []);
  };

  return (
    <CSSTransition
      in={isOpen}
      timeout={ANIMATION_TIME}
      onEnter={setIsMount.on}
      onExit={setIsMount.off}
      mountOnEnter
      unmountOnExit
    >
      <Modal onClose={onClose}>
        {isMobile && (
          <CSSTransition in={isMount} timeout={ANIMATION_TIME}>
            <ModalBackdrop
              className={cx('filters-backdrop', {
                'filters-backdrop--active': isMount,
                'filters-backdrop--dark': isDarkTheme,
              })}
            />
          </CSSTransition>
        )}
        <CSSTransition in={isMount} timeout={ANIMATION_TIME}>
          <div className={cx('filter-content-wrapper')}>
            <ModalContent
              className={cx('filters', {
                'filters--active': isMount,
                'filters--dark': isDarkTheme,
              })}
            >
              <ModalCloseButton className={cx('filters__close-button')} />
              <form className={cx('filters__form')}>
                <div className={cx('filters__fieldsets')}>
                  <fieldset className={cx('filters__fieldset')}>
                    <legend className="visually-hidden">Genres</legend>
                    <FieldsetName isDarkTheme={isDarkTheme} onClick={setIsGenresListOpen.toggle}>
                      Genres({getValues('genresIds').length})
                    </FieldsetName>
                    {isGenresListOpen && (
                      <ul className={cx('filters__filter-items', 'filters__filter-items--genres')}>
                        {genres.map((genre) => (
                          <li key={genre._id}>
                            <label>
                              <input
                                className="visually-hidden"
                                {...register('genresIds')}
                                value={genre._id}
                                type="checkbox"
                              />
                              <FilterItem
                                isDarkTheme={isDarkTheme}
                                isSelected={getValues('genresIds').includes(genre._id)}
                              >
                                {genre.name}
                              </FilterItem>
                            </label>
                          </li>
                        ))}
                      </ul>
                    )}
                  </fieldset>
                  <fieldset className={cx('filters__fieldset')}>
                    <legend className="visually-hidden">Sort by</legend>
                    <FieldsetName
                      isDarkTheme={isDarkTheme}
                      onClick={setIsSortingOptionsListOpen.toggle}
                    >
                      Sort by
                    </FieldsetName>
                    {isSortingOptionsListOpen && (
                      <ul
                        className={cx(
                          'filters__filter-items',
                          'filters__filter-items--sorting-options',
                        )}
                      >
                        {sortingOptions.map((option) => (
                          <li key={option.key}>
                            <label>
                              <input
                                className="visually-hidden"
                                {...register('orderBy')}
                                value={option.key}
                                type="radio"
                              />
                              <FilterItem
                                isDarkTheme={isDarkTheme}
                                isSelected={Boolean(getValues('orderBy')?.includes(option.key))}
                              >
                                {option.name}
                              </FilterItem>
                            </label>
                          </li>
                        ))}
                      </ul>
                    )}
                  </fieldset>
                </div>
                <div className={cx('filters__form-buttons')}>
                  <TextButton
                    isDarkTheme={isDarkTheme}
                    onClick={handleSubmit(onFiltersFormSubmit)}
                    type="submit"
                    isUnderlined
                  >
                    Show the results
                  </TextButton>
                  <TextButton
                    isDarkTheme={isDarkTheme}
                    onClick={handleReset}
                    type="reset"
                    isUnderlined
                  >
                    Clear
                  </TextButton>
                </div>
              </form>
            </ModalContent>
          </div>
        </CSSTransition>
      </Modal>
    </CSSTransition>
  );
};

export default FiltersSidePage;
