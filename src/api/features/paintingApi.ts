import { apiService, Tags } from '@api/apiService';
import { Painting } from '@schemas/Painting';
import { urlArtists } from '@api/consts';

const paintingApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchPaintingsByArtist: build.query<Painting[], { artistId: string }>({
      query: ({ artistId }) => ({
        method: 'GET',
        url: `${urlArtists}/${artistId}/paintings`,
      }),
    }),
    addPainting: build.mutation<Painting, { artistId: string; data: FormData }>({
      query: ({ artistId, data }) => ({
        method: 'POST',
        url: `${urlArtists}/${artistId}/paintings`,
        data,
      }),
      invalidatesTags: [Tags.specificArtist],
    }),
    changeMainPainting: build.mutation<null, { artistId: string; data: { mainPainting: string } }>({
      query: ({ artistId, data }) => ({
        method: 'PATCH',
        url: `artists/${artistId}/main-painting`,
        data,
      }),
    }),
    editPainting: build.mutation<
      Painting,
      { artistId: string; paintingId: string; data: FormData }
    >({
      query: ({ artistId, paintingId, data }) => ({
        method: 'PUT',
        url: `${urlArtists}/${artistId}/paintings/${paintingId}`,
        data,
      }),
      invalidatesTags: [Tags.specificArtist],
    }),
    deletePainting: build.mutation<string, { artistId: string; paintingId: string }>({
      query: ({ artistId, paintingId }) => ({
        method: 'DELETE',
        url: `artists/${artistId}/paintings/${paintingId}`,
      }),
      invalidatesTags: [Tags.specificArtist],
    }),
  }),
});

export const {
  useAddPaintingMutation,
  useChangeMainPaintingMutation,
  useEditPaintingMutation,
  useDeletePaintingMutation,
} = paintingApi;
