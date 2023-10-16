import { FC } from 'react';
import { useBoolean } from '@hooks/useBoolean';
import IconButton from '@components/IconButton';
import { ReactComponent as FiltersIcon } from '@assets/icons/filters.svg';
import Filters from './Filters';

interface FiltersButtonProps {
  isDarkTheme?: boolean;
  onSubmit: (sortingOption: 'asc' | 'desc' | null, genresIds: string[]) => void;
}

const FiltersButton: FC<FiltersButtonProps> = ({ isDarkTheme, onSubmit }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useBoolean();

  return (
    <>
      <IconButton isDarkTheme={isDarkTheme} onClick={setIsFiltersOpen.on}>
        <FiltersIcon aria-hidden />
        <span className="visually-hidden">Open filters</span>
      </IconButton>
      <Filters
        isOpen={isFiltersOpen}
        isDarkTheme={isDarkTheme}
        onSubmit={onSubmit}
        onClose={setIsFiltersOpen.off}
      />
    </>
  );
};

export default FiltersButton;
