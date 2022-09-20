import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Contact', 'User'],
  endpoints: () => ({}),
});

export const contactsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => ({ url: '/contacts', method: 'GET' }),
      providesTags: ['Contact'],
    }),

    addContact: builder.mutation({
      query: newContact => ({
        url: '/contacts',
        method: 'POST',
        body: newContact,
      }),
      invalidatesTags: ['Contact'],
    }),

    deleteContact: builder.mutation({
      query: contactId => ({
        url: `/contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),

    editContact: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/contacts/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation({
      query: newUser => ({
        url: '/users/signup',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'],
    }),

    logIn: builder.mutation({
      query: user => ({
        url: '/users/login',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),

    logOut: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    fetchCurrentUser: builder.query({
      query: () => ({ url: '/users/current', method: 'GET' }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useEditContactMutation,
  useDeleteContactMutation,
} = contactsApi;

export const {
  useFetchCurrentUserQuery,
  useRegisterMutation,
  useLogInMutation,
  useLogOutMutation,
} = authApi;
