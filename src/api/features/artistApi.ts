import { apiService } from '@api/apiService';
import { Artist } from '@schemas/Artist';
import { ArtistById } from '@schemas/ArtistById';

const urlStaticArtists = 'artists/static';

const artistApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchArtists: build.query<Artist[], null>({
      query: () => ({ url: urlStaticArtists }),
    }),
    fetchArtistById: build.query<ArtistById, string>({
      query: (id: string) => ({ url: `${urlStaticArtists}/${id}` }),
    }),
  }),
});

export const { useFetchArtistsQuery, useFetchArtistByIdQuery } = artistApi;
