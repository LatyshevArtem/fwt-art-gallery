import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getSearchParam } from '@utils/searchParams';
import { RootState } from '@store/store';

interface ArtistsFiltersState {
  name?: string | null;
  orderBy?: 'asc' | 'desc' | null;
  genres?: string[] | null;
}

const initialState: ArtistsFiltersState = {
  name: getSearchParam('name'),
  orderBy: getSearchParam('orderBy') as 'asc' | 'desc' | null,
  genres: getSearchParam('genres')?.split(','),
};

const artistsFiltersSlice = createSlice({
  name: 'artistsFilters',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string | null>) => {
      state.name = action.payload;
    },
    setOrderBy: (state, action: PayloadAction<'asc' | 'desc' | null>) => {
      state.orderBy = action.payload;
    },
    setGenres: (state, action: PayloadAction<string[] | null>) => {
      state.genres = action.payload;
    },
  },
});

export const selectArtistsFilters = (state: RootState) => state.artistsFilters;
export const { setName, setOrderBy, setGenres } = artistsFiltersSlice.actions;
export default artistsFiltersSlice.reducer;
