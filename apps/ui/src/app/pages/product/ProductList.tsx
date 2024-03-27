import { Box, styled } from '@mui/material';

export const ProductList = () => <Root>List</Root>;

const PREFIX = 'StoreProductList';
export const productListClasses = {};

const Root = styled(Box, {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({}));
