import { Image } from './Image';

export interface Painting {
  _id: string;
  image: Image;
  name: string;
  yearOfCreation: string;
  artist: string;
}
