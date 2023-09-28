import { apiService } from '@api/apiService';
import { Genre } from '@schemas/Genre';
import { Artist } from '@schemas/Artist';
import { ArtistById } from '@schemas/ArtistById';
import { Painting } from '@schemas/Painting';

const urlStaticArtists = 'artists/static';
const urlArtists = 'artists';

interface ArtistsMeta {
  count: number;
  pageNumber: number;
  perPage: number;
}

export interface DataOfAddArtistRequest {
  avatar?: File;
  name: string;
  yearsOfLife: string;
  description: string;
  genres: Genre[];
}

export interface DataOfAddPaintingToArtist {
  name: string;
  yearOfCreation: number;
  image?: File;
}

const artistApi = apiService
  .enhanceEndpoints({
    addTagTypes: ['Artists', 'SpecificArtist'],
  })
  .injectEndpoints({
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
        providesTags: ['Artists'],
      }),
      fetchArtistById: build.query<ArtistById, { id: string; isAuth: boolean }>({
        query: ({ id, isAuth }) => {
          const destinationUrl = isAuth ? urlArtists : urlStaticArtists;
          return {
            url: `${destinationUrl}/${id}`,
          };
        },
        providesTags: ['SpecificArtist'],
      }),
      addArtist: build.mutation<ArtistById, FormData>({
        query: (data) => ({ method: 'POST', url: urlArtists, data }),
        invalidatesTags: ['Artists'],
      }),
      editArtist: build.mutation<ArtistById, { id: string; data: FormData }>({
        query: ({ id, data }) => {
          return {
            method: 'PUT',
            url: `${urlArtists}/${id}`,
            data,
          };
        },
        invalidatesTags: ['SpecificArtist'],
      }),
      deleteArtistById: build.mutation<string, string>({
        query: (id) => ({ method: 'DELETE', url: `${urlArtists}/${id}` }),
        invalidatesTags: ['Artists'],
      }),
      addPaintingToArtist: build.mutation<Painting, { id: string; data: FormData }>({
        query: ({ id, data }) => ({
          method: 'POST',
          url: `${urlArtists}/${id}/paintings`,
          data,
        }),
        invalidatesTags: ['SpecificArtist'],
      }),
      changeArtistMainPainting: build.mutation<
        null,
        { artistId: string; data: { mainPainting: string } }
      >({
        query: ({ artistId, data }) => ({
          method: 'PATCH',
          url: `artists/${artistId}/main-painting`,
          data,
        }),
        invalidatesTags: ['Artists'],
      }),
      deleteArtistPainting: build.mutation<string, { artistId: string; paintingId: string }>({
        query: ({ artistId, paintingId }) => ({
          method: 'DELETE',
          url: `artists/${artistId}/paintings/${paintingId}`,
        }),
        invalidatesTags: ['SpecificArtist'],
      }),
    }),
  });

export const {
  useLazyFetchArtistsQuery,
  useLazyFetchArtistByIdQuery,
  useAddArtistMutation,
  useEditArtistMutation,
  useDeleteArtistByIdMutation,
  useAddPaintingToArtistMutation,
  useChangeArtistMainPaintingMutation,
  useDeleteArtistPaintingMutation,
} = artistApi;
