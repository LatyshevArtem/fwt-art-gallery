import { apiService } from '@api/apiService';
import { Genre } from '@schemas/Genre';
import { Artist } from '@schemas/Artist';
import { ArtistById } from '@schemas/ArtistById';

const urlStaticArtists = 'artists/static';
const urlArtists = 'artists';

interface ArtistsMeta {
  count: number;
  pageNumber: number;
  perPage: number;
}

interface DataOfAddArtistRequest {
  avatar?: Blob;
  name: string;
  yearsOfLife: string;
  description: string;
  genres: Genre[];
}

const artistApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchArtists: build.query<{ artists: Artist[]; meta: ArtistsMeta | null }, boolean>({
      query: (isAuth) => {
        const destinationUrl = isAuth ? urlArtists : urlStaticArtists;
        return {
          url: destinationUrl,
        };
      },
      transformResponse: (response: Artist[] | { data: Artist[]; meta: ArtistsMeta }) => {
        const transformedResponse =
          'data' in response
            ? { artists: response.data, meta: response.meta }
            : { artists: response, meta: null };
        return transformedResponse;
      },
    }),
    fetchArtistById: build.query<ArtistById, { id: string; isAuth: boolean }>({
      query: ({ id, isAuth }) => {
        const destinationUrl = isAuth ? urlArtists : urlStaticArtists;
        return {
          url: `${destinationUrl}/${id}`,
        };
      },
    }),
    addArtist: build.mutation<ArtistById, DataOfAddArtistRequest>({
      query: (data) => ({ method: 'POST', url: urlArtists, data }),
    }),
    deleteArtistById: build.mutation<string, string>({
      query: (id) => ({ method: 'DELETE', url: `${urlArtists}/${id}` }),
    }),
  }),
});

export const {
  useLazyFetchArtistsQuery,
  useLazyFetchArtistByIdQuery,
  useAddArtistMutation,
  useDeleteArtistByIdMutation,
} = artistApi;
