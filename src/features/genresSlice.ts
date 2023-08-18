import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Genre } from '@schemas/Genre';
import { GenresService } from '../services/genreService';

const fetchGenres = createAsyncThunk('genres/fetchGenres', GenresService.getGenres);

interface GenresState {
  genres: Genre[] | null;
}

const initialState: GenresState = {
  genres: null,
};

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
    });
  },
});

export { fetchGenres };
export default genresSlice.reducer;
