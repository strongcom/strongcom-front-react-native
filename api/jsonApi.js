import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// const baseUrl = process.env.REACT_APP_API_URL;
const baseUrl = 'http://192.168.0.24:8080';

const createRequest = url => ({url});

export const jsonApi = createApi({
  reducerPath: 'jsonApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: builder => ({
    getReminder: builder.query({
      query: filter => createRequest(`reminder`),
    }),
  }),
});

export const {useGetReminderQuery} = jsonApi;
