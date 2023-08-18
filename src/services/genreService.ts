import { http } from '../http/http';
import { Genre } from '../schemas/Genre';

const genresUrlForAnUnauthorizedUser = `genres/static`;

class GenresService {
  static getGenres = async () => {
    const { data } = await http.get<Genre[]>(genresUrlForAnUnauthorizedUser);
    return data;
  };
}

export { GenresService };
