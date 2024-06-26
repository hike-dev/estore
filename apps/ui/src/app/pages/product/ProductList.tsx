import { IProduct } from '@estore/shared';
import {
  Search as SearchIcon,
  LocalMallOutlined as LocalMallOutlinedIcon,
  FilterAltOutlined as FilterAltOutlinedIcon,
} from '@mui/icons-material';
import { Box, Button, Grid, IconButton, styled } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { useGetProductsQuery } from '../../features';
import { AppBar, FilterPanel } from '../../layout';

import { ProductListCard } from './ProductListCard';

export const ProductList = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const { data, isLoading } = useGetProductsQuery({ page });

  useEffect(() => {
    if (data) {
      const [products] = data;
      setProducts(cur => [...cur, ...products]);
    }
  }, [data]);

  const nextPage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  if (isLoading || !data) {
    return null;
  }
  const [, { to, total }] = data;
  const hasMore = total > to;
  return (
    <Root
      pageStart={1}
      loadMore={nextPage}
      hasMore={hasMore}
      initialLoad={false}
      loader={
        <div className="loader" key="loader">
          Loading ...
        </div>
      }
    >
      <AppBar />
      <FilterPanel total={total} />
      <Grid container className={productListClasses.listContainer}>
        {products?.map((product, i) => (
          <Grid
            item
            className={productListClasses.listItem}
            // key={product.id}
            key={i}
          >
            <ProductListCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Root>
  );
};

const PRODUCT_LIST_PREFIX = 'StoreProductList';
export const productListClasses = {
  listContainer: `${PRODUCT_LIST_PREFIX}-listContainer`,
  listItem: `${PRODUCT_LIST_PREFIX}-listItem`,
};

const Root = styled(InfiniteScroll, {
  name: PRODUCT_LIST_PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme: { spacing } }) => ({
  gap: spacing(2),
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  [`& .${productListClasses.listItem}`]: {},
  [`& .${productListClasses.listContainer}`]: {
    gap: spacing(4, 2),
    padding: spacing(2),
  },
  [`& .${productListClasses.listItem}`]: {
    width: `calc(50% - ${spacing(1)})`,
  },
}));
