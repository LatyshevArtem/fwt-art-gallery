import { apiService } from '@api/apiService';

interface AuthRequestData {
  username: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

interface RefreshRequestData {
  refreshToken: string;
}

const urlSignUp = 'auth/register';
const urlLogIn = 'auth/login';
const urlRefresh = 'auth/refresh';

const artistApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    signup: build.mutation<AuthResponse, AuthRequestData>({
      query: (authRequestData) => ({
        method: 'POST',
        url: urlSignUp,
        data: {
          ...authRequestData,
        },
      }),
    }),
    login: build.mutation<AuthResponse, AuthRequestData>({
      query: (authRequestData) => ({
        method: 'POST',
        url: urlLogIn,
        data: {
          ...authRequestData,
        },
      }),
    }),
    refresh: build.mutation<AuthResponse, RefreshRequestData>({
      query: (refreshRequestData) => ({
        method: 'POST',
        url: urlRefresh,
        data: {
          ...refreshRequestData,
        },
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useRefreshMutation } = artistApi;
