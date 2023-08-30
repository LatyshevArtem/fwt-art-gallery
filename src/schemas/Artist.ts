import { Painting } from './Painting';

export interface Artist {
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  mainPainting: Painting;
  __v: number;
}
