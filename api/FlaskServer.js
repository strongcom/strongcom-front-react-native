import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://192.168.0.28:13330/';

export const FlaskServer = createApi({
  reducerPath: 'FlaskServer',
  baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
  endpoints: builder => ({
    postImage: builder.mutation({
      query: form => {
        return {
          url: 'image/userid',
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: form,
        };
      },
    }),
  }),
});

export const {usePostImageMutation} = FlaskServer;
