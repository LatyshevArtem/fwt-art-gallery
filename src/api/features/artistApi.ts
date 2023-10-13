import { apiService, Tags } from '@api/apiService';
import { Artist } from '@schemas/Artist';
import { ArtistById } from '@schemas/ArtistById';

const urlStaticArtists = 'artists/static';
const urlArtists = 'artists';

interface ArtistsMeta {
  count: number;
  pageNumber: number;
  perPage: number;
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
      providesTags: [Tags.artist],
    }),
    fetchArtistById: build.query<ArtistById, { id: string; isAuth: boolean }>({
      query: ({ id, isAuth }) => {
        const destinationUrl = isAuth ? urlArtists : urlStaticArtists;
        return {
          url: `${destinationUrl}/${id}`,
        };
      },
      providesTags: [Tags.specificArtist],
    }),
    addArtist: build.mutation<ArtistById, FormData>({
      query: (data) => ({ method: 'POST', url: urlArtists, data }),
      invalidatesTags: [Tags.artist],
    }),
    editArtist: build.mutation<ArtistById, { id: string; data: FormData }>({
      query: ({ id, data }) => {
        return {
          method: 'PUT',
          url: `${urlArtists}/${id}`,
          data,
        };
      },
      invalidatesTags: [Tags.artist, Tags.specificArtist],
    }),
    deleteArtistById: build.mutation<string, string>({
      query: (id) => ({ method: 'DELETE', url: `${urlArtists}/${id}` }),
      invalidatesTags: [Tags.artist],
    }),
  }),
});

export const {
  useLazyFetchArtistsQuery,
  useLazyFetchArtistByIdQuery,
  useAddArtistMutation,
  useEditArtistMutation,
  useDeleteArtistByIdMutation,
} = artistApi;
