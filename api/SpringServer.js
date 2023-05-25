import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-community/async-storage';
import {springServer} from '../resources/serverInfo';

// const server = nodeServer;
const server = springServer;

export const SpringServer = createApi({
  reducerPath: 'SpringServer',
  baseQuery: fetchBaseQuery({
    baseUrl: server.baseUrl,
    prepareHeaders: async headers => {
      await AsyncStorage.getItem('access_token').then(accessToken => {
        headers.set('Access_Token', `Bearer ${accessToken}`);
        headers.set('Authorization', `Bearer ${accessToken}`);
        console.log('Authorization', `Bearer ${accessToken}`);
      });
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
    deleteReminder: builder.mutation({
      query: id => {
        return {
          url: server.deleteReminder(id),
          method: 'DELETE',
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
          responseHandler: response => response.text(),
        };
      },
    }),
    postUsername: builder.mutation({
      query: username => {
        return {
          url: server.postUsername,
          method: 'PATCH',
          body: {
            // username: username,
            userName: username,
          },
          responseHandler: response => response.text(),
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
    deleteUser: builder.mutation({
      query: () => {
        return {
          url: server.deleteUser,
          method: 'DELETE',
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
  useDeleteReminderMutation,
  useGetUserInfoQuery,
  useRegisterUserMutation,
  useDeleteUserMutation,
  useKakaoLoginMutation,
  usePostUsernameMutation,
} = SpringServer;
