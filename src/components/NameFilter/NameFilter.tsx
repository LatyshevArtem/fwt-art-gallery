import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectArtistsFilters, setName } from '@store/features/artistsFilters/artistsFiltersSlice';
import { useBoolean } from '@hooks/useBoolean';
import useComponentDidMount from '@hooks/useComponentDidMount';
import { useAppDispatch } from '@hooks/useAppDispatch';
import useDebounce from '@hooks/useDebounce';
import SearchBar from '@components/SearchBar';

interface NameFilterProps {
  isMobile?: boolean;
  isDarkTheme?: boolean;
}

const NameFilter: FC<NameFilterProps> = ({ isMobile = true, isDarkTheme }) => {
  const { name } = useAppSelector(selectArtistsFilters);
  const [value, setValue] = useState(name || '');
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useBoolean();
  const isMounted = useComponentDidMount();
  const dispatch = useAppDispatch();

  const debouncedValue = useDebounce(value, 500);

  const reset = () => setValue('');

  useEffect(() => {
    if (isMounted) {
      if (debouncedValue) {
        searchParams.set('name', debouncedValue);
      } else {
        searchParams.delete('name');
      }
      setSearchParams(searchParams);
      dispatch(setName(debouncedValue || null));
    }
  }, [isMounted, searchParams, debouncedValue, setSearchParams, dispatch]);

  return (
    <SearchBar
      isOpen={!isMobile || isOpen}
      isDarkTheme={isDarkTheme}
      value={value}
      setIsOpen={isMobile ? setIsOpen.on : () => {}}
      onChange={(event) => setValue(event.target.value)}
      reset={reset}
      onClose={isMobile ? setIsOpen.off : () => {}}
    />
  );
};

export default NameFilter;
