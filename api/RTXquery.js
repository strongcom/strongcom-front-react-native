import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-community/async-storage';

// const baseUrl = process.env.REACT_APP_API_URL;
const baseUrl = 'http://10.0.2.2:8080/api/';

export const RTXquery = createApi({
  reducerPath: 'RTXquery',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: async headers => {
      headers.set('Cookie', await AsyncStorage.getItem('access_token'));
      return headers;
    },
  }),
  tagTypes: ['Reminder'],
  endpoints: builder => ({
    getReminderList: builder.query({
      query: filter => ({url: `reminder/${filter}`}),
      providesTags: (result, error, arg) => {
        // console.log(result, error);
        return [{type: 'Reminder'}];
      },
    }),
    postReminder: builder.mutation({
      query: body => {
        return {
          url: 'reminder',
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: (result, error, arg) => [{type: 'Reminder'}],
    }),
    registerUser: builder.mutation({
      query: ({...body}) => {
        return {
          url: 'auth/register',
          method: 'POST',
          body: body,
        };
      },
    }),
    login: builder.mutation({
      query: ({...body}) => {
        return {
          url: 'auth/login',
          method: 'POST',
          body: body,
        };
      },
      transformResponse(baseQueryReturnValue, meta, arg) {
        return {
          data: baseQueryReturnValue,
          cookie: meta.response.headers.map['set-cookie'],
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
