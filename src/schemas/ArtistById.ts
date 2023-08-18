import { Image } from './Image';
import { Genre } from './Genre';

export interface ArtistById {
  _id: string;
  avatar: Image;
  name: string;
  description: string;
  yearsOfLife: string;
  paintings: string[];
  genres: Genre[];
}
