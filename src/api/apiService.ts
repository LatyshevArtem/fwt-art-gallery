import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';

export enum Tags {
  artist = 'Artists',
  specificArtist = 'SpecificArtist',
}

export const apiService = createApi({
  baseQuery: axiosBaseQuery(),
  tagTypes: Object.values(Tags),
  endpoints: () => ({}),
});
