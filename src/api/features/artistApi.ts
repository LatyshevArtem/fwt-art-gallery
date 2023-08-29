import { createApi } from '@reduxjs/toolkit/query/react';
import { Artist } from '@schemas/Artist';
import { ArtistById } from '@schemas/ArtistById';
import { axiosBaseQuery } from '../axiosBaseQuery';

const urlStaticArtists = 'artists/static';

const artistApi = createApi({
  reducerPath: 'artistApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    fetchArtists: build.query<Artist[], null>({
      query: () => {
        return urlStaticArtists;
      },
    }),
    fetchArtistById: build.query<ArtistById, string>({
      query: (id: string) => {
        return `${urlStaticArtists}/${id}`;
      },
    }),
  }),
});

export const { useFetchArtistsQuery, useFetchArtistByIdQuery } = artistApi;
export { artistApi };
