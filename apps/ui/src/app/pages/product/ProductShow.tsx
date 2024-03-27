import { Box, styled } from '@mui/material';

export const ProductShow = () => <Root>Show</Root>;

const PREFIX = 'StoreProductShow';
export const productShowClasses = {};

const Root = styled(Box, {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({}));
