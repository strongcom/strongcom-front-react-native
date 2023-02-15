import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// const baseUrl = process.env.REACT_APP_API_URL;
const baseUrl = 'http://127.0.0.1:4000/api/';

const createRequest = url => ({url});

export const jsonApi = createApi({
  reducerPath: 'jsonApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: builder => ({
    getReminder: builder.query({
      query: filter => createRequest(`reminder?filter=${filter}`),
    }),
  }),
});

export const {useGetReminderQuery} = jsonApi;
