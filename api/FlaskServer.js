import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://210.111.190.189:13330/';

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
          responseHandler: response => response.text(),
        };
      },
    }),
  }),
});

export const {usePostImageMutation} = FlaskServer;
