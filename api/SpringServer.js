import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-community/async-storage';
import {nodeServer} from '../resources/serverInfo';

const server = nodeServer;

export const SpringServer = createApi({
  reducerPath: 'SpringServer',
  baseQuery: fetchBaseQuery({
    baseUrl: server.baseUrl,
    prepareHeaders: async headers => {
      headers.set('Access_Token', await AsyncStorage.getItem('access_token'));
      return headers;
    },
  }),
  tagTypes: ['Reminder'],
  endpoints: builder => ({
    getReminderList: builder.query({
      query: filter => ({url: server.getReminder(filter)}),
      providesTags: (result, error, arg) => {
        // console.log(result, error);
        return [{type: 'Reminder'}];
      },
    }),
    getReminderById: builder.query({
      query: id => ({url: server.getReminderById(id)}),
    }),
    postReminder: builder.mutation({
      query: body => {
        return {
          url: server.postReminder,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: (result, error, arg) => [{type: 'Reminder'}],
    }),
    kakaoLogin: builder.mutation({
      query: body => {
        return {
          url: server.kakao,
          method: 'POST',
          body: body,
        };
      },
    }),
    postUsername: builder.mutation({
      query: username => {
        return {
          url: server.postUsername,
          method: 'POST',
          body: {
            username: username,
          },
        };
      },
    }),
    getUserInfo: builder.query({
      query: () => server.getUserInfo,
    }),
    registerUser: builder.mutation({
      query: ({...body}) => {
        return {
          url: server.registerUser,
          method: 'POST',
          body: body,
        };
      },
    }),
    login: builder.mutation({
      query: ({...body}) => {
        return {
          url: server.login,
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
  useGetReminderByIdQuery,
  usePostReminderMutation,
  useGetUserInfoQuery,
  useRegisterUserMutation,
  useKakaoLoginMutation,
  usePostUsernameMutation,
} = SpringServer;
