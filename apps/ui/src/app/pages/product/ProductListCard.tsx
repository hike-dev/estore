import { IProduct } from '@estore/shared';
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  List,
  ListItem,
  cardHeaderClasses,
  styled,
} from '@mui/material';
import { Link } from 'react-router-dom';

export const ProductListCard = ({ product }: { product: IProduct }) => (
  <Root>
    <CardContent className={productListCardClasses.visuals}>
      <Link
        className={productListCardClasses.imageLink}
        to={`/product/${product.id}`}
      >
        <CardMedia
          className={productListCardClasses.image}
          component="img"
          width={170}
          height={250}
          image={product.photos[0]}
        />
      </Link>
      <IconButton
        className={productListCardClasses.like}
        aria-label="add to favorites"
      >
        {product.like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      <List className={productListCardClasses.tagList}>
        {product.tags.map(tag => (
          <ListItem className={productListCardClasses.tag} key={tag}>
            {tag}
          </ListItem>
        ))}
      </List>
      {product.discount ? (
        <Box className={productListCardClasses.discount}>
          -{product.discount}%
        </Box>
      ) : null}
    </CardContent>
    <Link
      className={productListCardClasses.contentLink}
      to={`/product/${product.id}`}
    >
      <CardHeader
        className={productListCardClasses.header}
        title={product.title}
        subheader={product.brand}
      />
      <Box className={productListCardClasses.price}>
        <Box className={productListCardClasses.priceOriginal}>
          ${product.price}
        </Box>
        {product.discount ? (
          <Box className={productListCardClasses.priceDiscounted}>
            $
            {Math.round(
              product.price - (product.price / 100) * product.discount,
            )}
          </Box>
        ) : null}
      </Box>
    </Link>
  </Root>
);

const PRODUCT_LIST_CARD_PREFIX = 'StoreProductListCard';
export const productListCardClasses = {
  imageLink: `${PRODUCT_LIST_CARD_PREFIX}-imageLink`,
  contentLink: `${PRODUCT_LIST_CARD_PREFIX}-contentLink`,
  visuals: `${PRODUCT_LIST_CARD_PREFIX}-visuals`,
  image: `${PRODUCT_LIST_CARD_PREFIX}-image`,
  like: `${PRODUCT_LIST_CARD_PREFIX}-like`,
  tagList: `${PRODUCT_LIST_CARD_PREFIX}-tagList`,
  tag: `${PRODUCT_LIST_CARD_PREFIX}-tag`,
  discount: `${PRODUCT_LIST_CARD_PREFIX}-discount`,
  header: `${PRODUCT_LIST_CARD_PREFIX}-header`,
  price: `${PRODUCT_LIST_CARD_PREFIX}-price`,
  priceOriginal: `${PRODUCT_LIST_CARD_PREFIX}-priceOriginal`,
  priceDiscounted: `${PRODUCT_LIST_CARD_PREFIX}-priceDiscounted`,
};

const Root = styled(Card, {
  name: PRODUCT_LIST_CARD_PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme: { spacing } }) => ({
  boxShadow: 'none',
  [`& .${productListCardClasses.imageLink}, & .${productListCardClasses.contentLink}`]:
    {
      textDecoration: 'none',
      color: 'inherit',
    },
  [`& .${productListCardClasses.visuals}`]: {
    position: 'relative',
    padding: 0,
    [`& .${productListCardClasses.image}`]: {},
    [`& .${productListCardClasses.like}`]: {
      position: 'absolute',
      top: spacing(1),
      right: spacing(1),
      background: '#fff',
    },
    [`& .${productListCardClasses.tagList}`]: {
      position: 'absolute',
      display: 'flex',
      bottom: spacing(1.5),
      left: spacing(1.5),
      gap: spacing(1),
      padding: 0,
    },
    [`& .${productListCardClasses.tag}`]: {
      background: '#fff',
      borderRadius: spacing(0.5),
      padding: spacing(0, 1),
      lineHeight: spacing(3),
    },
    [`& .${productListCardClasses.discount}`]: {
      position: 'absolute',
      top: spacing(2),
      left: spacing(1),
      background: '#d70015',
      color: '#fff',
      padding: spacing(0, 1),
      borderRadius: spacing(0.5),
    },
  },
  [`& .${productListCardClasses.header}`]: {
    padding: spacing(1, 0),
    [`& .${cardHeaderClasses.content}`]: {
      display: 'flex',
      flexDirection: 'column-reverse',
    },
    [`& .${cardHeaderClasses.title}`]: {
      lineHeight: 1.5,
      fontSize: spacing(2),
    },
    [`& .${cardHeaderClasses.subheader}`]: {
      lineHeight: 1.5,
      marginBottom: spacing(0.5),
      fontSize: spacing(1.5),
    },
  },
  [`& .${productListCardClasses.price}`]: {
    display: 'flex',
    gap: spacing(2),
    [`& .${productListCardClasses.priceOriginal}`]: {},
    [`& .${productListCardClasses.priceDiscounted}`]: {
      color: '#d70015',
      fontWeight: 700,
    },
  },
}));
