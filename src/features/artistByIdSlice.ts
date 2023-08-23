import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ArtistService } from '../services/artistService';
import { ArtistById } from '../schemas/ArtistById';

const fetchArtistById = createAsyncThunk('artists/fetchArtistById', ArtistService.getArtistById);

interface ArtistByIdState {
  artist: ArtistById | null;
}

const initialState: ArtistByIdState = {
  artist: null,
};

const artistByIdSlice = createSlice({
  name: 'artistById',
  initialState,
  reducers: {
    resetArtist: (state) => {
      state.artist = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchArtistById.fulfilled, (state, action) => {
      state.artist = action.payload;
    });
  },
});

export const { resetArtist } = artistByIdSlice.actions;
export { fetchArtistById };
export default artistByIdSlice.reducer;
