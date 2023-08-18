import { Image } from './Image';

interface MainPainting {
  _id: string;
  name: string;
  yearsOfCreation: string;
  image: Image;
  artist: string;
}

export interface Artist {
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  mainPainting: MainPainting;
  __v: number;
}
