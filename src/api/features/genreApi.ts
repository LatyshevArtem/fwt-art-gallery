import { apiService } from '@api/apiService';
import { Genre } from '@schemas/Genre';

const urlStaticGenres = 'genres/static';
const urlGenres = 'genres';

const genreApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchGenres: build.query<Genre, boolean>({
      query: (isAuth) => {
        const destinationUrl = isAuth ? urlGenres : urlStaticGenres;
        return {
          url: destinationUrl,
        };
      },
    }),
  }),
});

export const { useFetchGenresQuery } = genreApi;
