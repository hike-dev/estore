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

export const ProductCard = ({ product }: { product: IProduct }) => (
  <Root>
    <CardContent className={productCardClasses.visuals}>
      <Link
        className={productCardClasses.imageLink}
        to={`/product/${product.id}`}
      >
        <CardMedia
          className={productCardClasses.image}
          component="img"
          width={170}
          height={250}
          image={product.photos[0]}
        />
      </Link>
      <IconButton
        className={productCardClasses.like}
        aria-label="add to favorites"
      >
        {product.like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      <List className={productCardClasses.tagList}>
        {product.tags.map(tag => (
          <ListItem className={productCardClasses.tag} key={tag}>
            {tag}
          </ListItem>
        ))}
      </List>
      {product.discount ? (
        <Box className={productCardClasses.discount}>-{product.discount}%</Box>
      ) : null}
    </CardContent>
    <Link
      className={productCardClasses.contentLink}
      to={`/product/${product.id}`}
    >
      <CardHeader
        className={productCardClasses.header}
        title={product.title}
        subheader={product.brand}
      />
      <Box className={productCardClasses.price}>
        <Box className={productCardClasses.priceOriginal}>${product.price}</Box>
        {product.discount ? (
          <Box className={productCardClasses.priceDiscounted}>
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

const PRODUCT_CARD_PREFIX = 'StoreProductCard';
export const productCardClasses = {
  imageLink: `${PRODUCT_CARD_PREFIX}-imageLink`,
  contentLink: `${PRODUCT_CARD_PREFIX}-contentLink`,
  visuals: `${PRODUCT_CARD_PREFIX}-visuals`,
  image: `${PRODUCT_CARD_PREFIX}-image`,
  like: `${PRODUCT_CARD_PREFIX}-like`,
  tagList: `${PRODUCT_CARD_PREFIX}-tagList`,
  tag: `${PRODUCT_CARD_PREFIX}-tag`,
  discount: `${PRODUCT_CARD_PREFIX}-discount`,
  header: `${PRODUCT_CARD_PREFIX}-header`,
  price: `${PRODUCT_CARD_PREFIX}-price`,
  priceOriginal: `${PRODUCT_CARD_PREFIX}-priceOriginal`,
  priceDiscounted: `${PRODUCT_CARD_PREFIX}-priceDiscounted`,
};

const Root = styled(Card, {
  name: PRODUCT_CARD_PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme: { spacing } }) => ({
  boxShadow: 'none',
  [`& .${productCardClasses.imageLink}, & .${productCardClasses.contentLink}`]:
    {
      textDecoration: 'none',
      color: 'inherit',
    },
  [`& .${productCardClasses.visuals}`]: {
    position: 'relative',
    padding: 0,
    [`& .${productCardClasses.image}`]: {},
    [`& .${productCardClasses.like}`]: {
      position: 'absolute',
      top: spacing(1),
      right: spacing(1),
      background: '#fff',
    },
    [`& .${productCardClasses.tagList}`]: {
      position: 'absolute',
      display: 'flex',
      bottom: spacing(1.5),
      left: spacing(1.5),
      gap: spacing(1),
      padding: 0,
    },
    [`& .${productCardClasses.tag}`]: {
      background: '#fff',
      borderRadius: spacing(0.5),
      padding: spacing(0, 1),
      lineHeight: spacing(3),
    },
    [`& .${productCardClasses.discount}`]: {
      position: 'absolute',
      top: spacing(2),
      left: spacing(1),
      background: '#d70015',
      color: '#fff',
      padding: spacing(0, 1),
      borderRadius: spacing(0.5),
    },
  },
  [`& .${productCardClasses.header}`]: {
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
  [`& .${productCardClasses.price}`]: {
    display: 'flex',
    gap: spacing(2),
    [`& .${productCardClasses.priceOriginal}`]: {},
    [`& .${productCardClasses.priceDiscounted}`]: {
      color: '#d70015',
      fontWeight: 700,
    },
  },
}));
