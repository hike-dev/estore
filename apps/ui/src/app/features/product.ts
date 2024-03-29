// Need to use the React-specific entry point to import createApi

import { IProduct } from '@estore/shared';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '../environment';

const CONTENT_RANGE_PARSER =
  /(?<tag>\w+)\s(?<from>\d+)-(?<to>\d+)\/(?<total>\d+)/;

export interface IContentRangeGroups {
  tag: string;
  from: number;
  to: number;
  total: number;
}

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: builder => ({
    getProducts: builder.query<
      [IProduct[], IContentRangeGroups],
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
      transformResponse: (
        data: IProduct[],
        meta: { request: Request; response: Response },
      ) => {
        const contentRange = meta.response.headers.get('Content-Range') ?? '';
        if (!CONTENT_RANGE_PARSER.test(contentRange ?? '')) {
          throw new Error(
            'Content-Range header does not match pattern "{tag} {from}-{to}/{total}"',
          );
        }
        const { tag, from, to, total }: IContentRangeGroups =
          CONTENT_RANGE_PARSER.exec(contentRange)!.groups as any;

        return [data, { tag, from: +from, to: +to, total: +total }];
      },
    }),
    getProduct: builder.query<IProduct, string>({
      query: (id: string) => ({
        url: `product/${id}`,
      }),
      transformResponse: (response: any, meta: any) => response,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery, useGetProductQuery } = productApi;
