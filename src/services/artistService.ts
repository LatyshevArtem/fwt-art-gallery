import { http } from '../http/http';
import { Artist } from '../schemas/Artist';
import { ArtistById } from '../schemas/ArtistById';

const artistsUrlForAnUnauthorizedUser = `artists/static`;

class ArtistService {
  static getArtists = async () => {
    const { data } = await http.get<Artist[]>(artistsUrlForAnUnauthorizedUser);
    return data;
  };

  static getArtistById = async (id: string) => {
    const urlArtistById = `${artistsUrlForAnUnauthorizedUser}/${id}`;
    const { data } = await http.get<ArtistById>(urlArtistById);
    return data;
  };
}

export { ArtistService };
