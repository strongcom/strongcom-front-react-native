import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// const baseUrl = process.env.REACT_APP_API_URL;
// const baseUrl = 'http://127.0.0.1:4000/api/';
const baseUrl = 'http://10.0.2.2:4000/api/';

const createRequest = url => ({url});

export const RTXquery = createApi({
  reducerPath: 'RTXquery',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: builder => ({
    getReminderList: builder.query({
      query: filter => createRequest(`reminder`),
    }),
    postReminder: builder.mutation({
      query: ({body}) => {
        return {
          url: 'reminder',
          method: 'POST',
          body: {body},
        };
      },
    }),
    registerUser: builder.mutation({
      query: ({...body}) => {
        return {
          url: 'auth/register',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: body,
        };
      },
    }),
    login: builder.mutation({
      query: ({...body}) => {
        return {
          url: 'auth/login',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: body,
        };
      },
    }),
  }),
});

export const {
  useGetReminderListQuery,
  usePostReminderMutation,
  useRegisterUserMutation,
  useLoginMutation,
} = RTXquery;
