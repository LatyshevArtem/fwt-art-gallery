import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ArtistService } from '../services/artistService';
import { Artist } from '../schemas/Artist';

const fetchArtists = createAsyncThunk('artists/fetchArtists', ArtistService.getArtists);

interface ArtistsState {
  artists: Artist[] | null;
}

const initialState: ArtistsState = {
  artists: null,
};

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchArtists.fulfilled, (state, action) => {
      state.artists = action.payload;
    });
  },
});

export { fetchArtists };
export default artistsSlice.reducer;
