// Need to use the React-specific entry point to import createApi
import { IProduct } from '@estore/shared';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/product' }),
  endpoints: builder => ({
    getProduct: builder.query<IProduct, string>({
      query: name => `product`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductQuery } = productApi;
