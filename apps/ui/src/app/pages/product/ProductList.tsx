import { IProduct } from '@estore/shared';
import { Grid, styled } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { useGetProductsQuery } from '../../features';

import { ProductCard } from './ProductCard';

export const ProductList = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const { data, isLoading } = useGetProductsQuery({ page });

  useEffect(() => {
    if (data) {
      setProducts(cur => [...cur, ...data]);
    }
  }, [data]);

  const nextPage = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  if (isLoading || !data) {
    return null;
  }
  return (
    <Root
      pageStart={1}
      loadMore={nextPage}
      hasMore={false}
      initialLoad={false}
      loader={
        <div className="loader" key="loader">
          Loading ...
        </div>
      }
    >
      <Grid container padding={2} className={productListClasses.listContainer}>
        {products?.map((product, i) => (
          <Grid
            item
            className={productListClasses.listItem}
            // key={product.id}
            key={i}
          >
            <ProductCard product={product} />
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
  [`& .${productListClasses.listContainer}`]: {
    gap: spacing(4, 2),
  },
  [`& .${productListClasses.listItem}`]: {
    width: `calc(50% - ${spacing(1)})`,
  },
}));
