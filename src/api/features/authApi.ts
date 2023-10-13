import { apiService } from '@api/apiService';
import { AuthResponse } from '@schemas/AuthResponse';

interface AuthRequestData {
  username: string;
  password: string;
}

interface RefreshRequestData {
  refreshToken: string;
}

const urlSignUp = 'auth/register';
const urlLogIn = 'auth/login';
const urlRefresh = 'auth/refresh';

const authApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    signup: build.mutation<AuthResponse, AuthRequestData>({
      query: (data) => ({
        method: 'POST',
        url: urlSignUp,
        data,
      }),
    }),
    login: build.mutation<AuthResponse, AuthRequestData>({
      query: (data) => ({
        method: 'POST',
        url: urlLogIn,
        data,
      }),
    }),
    refresh: build.mutation<AuthResponse, RefreshRequestData>({
      query: (data) => ({
        method: 'POST',
        url: urlRefresh,
        data,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useRefreshMutation } = authApi;
