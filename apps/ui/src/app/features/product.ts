// Need to use the React-specific entry point to import createApi
import { IProduct } from '@estore/shared';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '../environment';
// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: builder => ({
    getProducts: builder.query<
      IProduct[],
      {
        perPage?: number;
        page: number;
      }
    >({
      query: ({ perPage = 20, page = 1 }) => ({
        url: `product`,
        params: {
          offset: (page - 1) * perPage,
          limit: perPage,
        },
      }),
    }),
    getProduct: builder.query<IProduct, string>({
      query: (id: string) => ({
        url: `product/${id}`,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery, useGetProductQuery } = productApi;
