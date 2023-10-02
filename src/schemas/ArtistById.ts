import { Image } from './Image';
import { Painting } from './Painting';
import { Genre } from './Genre';

export interface ArtistById {
  _id: string;
  avatar: Image;
  name: string;
  description: string;
  yearsOfLife: string;
  mainPainting: Painting;
  paintings: Painting[];
  genres: Genre[];
}
