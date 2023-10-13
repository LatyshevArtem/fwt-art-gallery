import { apiService } from '@api/apiService';
import { Genre } from '@schemas/Genre';

const urlGenres = 'genres';

const genreApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchGenres: build.query<Genre[], undefined>({
      query: () => ({ url: urlGenres }),
    }),
  }),
});

export const { useFetchGenresQuery } = genreApi;
