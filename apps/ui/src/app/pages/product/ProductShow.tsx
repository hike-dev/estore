/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Container, styled } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useGetProductQuery } from '../../features';

import { ProductShowCard } from './ProductShowCard';

export const ProductShow = () => {
  const { productId } = useParams();
  const { data: product, isLoading } = useGetProductQuery(productId!);

  if (isLoading || !product) {
    return null;
  }

  return (
    <Root>
      <ProductShowCard product={product} />
    </Root>
  );
};

const PRODUCT_SHOW_PREFIX = 'StoreProductShow';
export const productShowClasses = {};

const Root = styled(Container, {
  name: PRODUCT_SHOW_PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme: { spacing } }) => ({
  padding: 0,
}));
