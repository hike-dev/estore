import {
  IProduct,
  IProductColor,
  IProductMaterial,
  IProductSize,
} from '@estore/shared';
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  ExpandMore as ExpandMoreIcon,
  LocalShippingOutlined as LocalShippingOutlinedIcon,
  Close as CloseIcon,
  LocalMallOutlined as LocalMallOutlinedIcon,
  ShareOutlined as ShareOutlinedIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardHeader,
  CardMedia,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  accordionClasses,
  accordionDetailsClasses,
  accordionSummaryClasses,
  cardClasses,
  cardHeaderClasses,
  cardMediaClasses,
  formControlLabelClasses,
  formGroupClasses,
  formLabelClasses,
  iconButtonClasses,
  radioClasses,
  styled,
  svgIconClasses,
} from '@mui/material';
import { FormEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-router-dom';

export const ProductShowCard = ({ product }: { product: IProduct }) => {
  const { register, control } = useForm<{
    size: IProductSize['value'];
    color: IProductColor['value'];
    material: IProductMaterial['value'];
  }>({
    defaultValues: {
      size: product.availableSize[0].value,
      color: product.availableColor[0].value,
      material: product.availableMaterial[0].value,
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Root>
      <Card className={productShowCardClasses.carouselWrapper}>
        <Carousel
          className={productShowCardClasses.carousel}
          swipe
          autoPlay={false}
          animation="slide"
          height={650}
          indicatorContainerProps={{
            className: productShowCardClasses.carouselIndicator,
          }}
          activeIndicatorIconButtonProps={{
            className: productShowCardClasses.carouselIndicatorActive,
          }}
          navButtonsAlwaysInvisible={true}
        >
          {product.photos.map((item, i) => (
            <Card className={productShowCardClasses.carouselItem} key={i}>
              <CardMedia
                className={productShowCardClasses.carouselImage}
                component="img"
                image={item}
              />
            </Card>
          ))}
        </Carousel>
        <Link to={'/product'}>
          <IconButton className={productShowCardClasses.carouselClose}>
            <CloseIcon />
          </IconButton>
        </Link>
        <IconButton className={productShowCardClasses.carouselCart}>
          <LocalMallOutlinedIcon />
        </IconButton>
        <IconButton className={productShowCardClasses.carouselShare}>
          <ShareOutlinedIcon />
        </IconButton>
        <IconButton className={productShowCardClasses.carouselLike}>
          {product.like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Card>
      <CardHeader
        className={productShowCardClasses.header}
        title={
          <Box className={productShowCardClasses.headerTitleContainer}>
            <Box className={productShowCardClasses.headerTitle}>
              {product.title}
            </Box>
            <Box className={productShowCardClasses.headerPrice}>
              <Box className={productShowCardClasses.headerPriceOriginal}>
                ${product.price}
              </Box>
              {product.discount ? (
                <Box className={productShowCardClasses.headerPriceDiscounted}>
                  $
                  {Math.round(
                    product.price - (product.price / 100) * product.discount,
                  )}
                </Box>
              ) : null}
            </Box>
          </Box>
        }
        subheader={product.brand}
      />
      <form className={productShowCardClasses.form} onSubmit={onSubmit}>
        <Select
          className={productShowCardClasses.size}
          {...register('size')}
          defaultValue={product.availableSize[0].value}
          label="Choose Size"
          variant="outlined"
        >
          {product.availableSize.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
        <Button className={productShowCardClasses.submit} type="submit">
          Add to Bag
        </Button>
        <FormControl
          className={productShowCardClasses.radioContainer}
          component="fieldset"
        >
          <FormLabel component="legend">Color</FormLabel>
          <Controller
            control={control}
            name="color"
            render={({ field }) => (
              <RadioGroup {...field}>
                {product.availableColor.map(({ image, value }) => (
                  <Card key={value}>
                    <FormControlLabel
                      label={<CardMedia component="img" image={image} />}
                      control={<Radio />}
                      value={value}
                    />
                  </Card>
                ))}
              </RadioGroup>
            )}
          />
        </FormControl>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            More Info
          </AccordionSummary>
          <AccordionDetails>{product.details}</AccordionDetails>
        </Accordion>
        <Accordion className={productShowCardClasses.material}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Material
          </AccordionSummary>
          <AccordionDetails>
            <FormControl
              component="fieldset"
              className={productShowCardClasses.radioContainer}
            >
              <FormLabel component="legend">Color</FormLabel>
              <Controller
                control={control}
                name="material"
                render={({ field }) => (
                  <RadioGroup {...field}>
                    {product.availableMaterial.map(({ image, value }) => (
                      <Card key={value}>
                        <FormControlLabel
                          label={<CardMedia component="img" image={image} />}
                          control={<Radio />}
                          value={value}
                        />
                      </Card>
                    ))}
                  </RadioGroup>
                )}
              />
            </FormControl>
          </AccordionDetails>
        </Accordion>
        <Box className={productShowCardClasses.rating}>
          <Box className={productShowCardClasses.ratingLabel}>
            Ratings ({product.rating.count})
          </Box>
          <Box className={productShowCardClasses.ratingStars}>
            <Box className={productShowCardClasses.ratingStarsBase}>
              <StarBorderIcon />
              <StarBorderIcon />
              <StarBorderIcon />
              <StarBorderIcon />
              <StarBorderIcon />
            </Box>
            <Box
              className={productShowCardClasses.ratingStarsOverlay}
              sx={{
                width: `${20 * product.rating.average}%`,
              }}
            >
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </Box>
          </Box>
        </Box>
      </form>
      <Container className={productShowCardClasses.shipping}>
        <LocalShippingOutlinedIcon
          className={productShowCardClasses.shippingIcon}
        />
        <Box className={productShowCardClasses.shippingTimeRange}>
          {product.shipping.timeRange.join('-')} workdays
        </Box>
        <Box className={productShowCardClasses.shippingPrice}>
          {product.shipping.price
            ? `$${product.shipping.price}`
            : 'Free Delivery'}
        </Box>
      </Container>
    </Root>
  );
};

const PRODUCT_SHOW_CARD_PREFIX = 'StoreProductShowCard';
export const productShowCardClasses = {
  carouselWrapper: `${PRODUCT_SHOW_CARD_PREFIX}-carouselWrapper`,
  carousel: `${PRODUCT_SHOW_CARD_PREFIX}-carousel`,
  carouselIndicator: `${PRODUCT_SHOW_CARD_PREFIX}-carouselIndicator`,
  carouselIndicatorActive: `${PRODUCT_SHOW_CARD_PREFIX}-carouselIndicatorActive`,
  carouselItem: `${PRODUCT_SHOW_CARD_PREFIX}-carouselItem`,
  carouselImage: `${PRODUCT_SHOW_CARD_PREFIX}-carouselImage`,
  carouselClose: `${PRODUCT_SHOW_CARD_PREFIX}-close`,
  carouselCart: `${PRODUCT_SHOW_CARD_PREFIX}-cart`,
  carouselShare: `${PRODUCT_SHOW_CARD_PREFIX}-share`,
  carouselLike: `${PRODUCT_SHOW_CARD_PREFIX}-like`,
  header: `${PRODUCT_SHOW_CARD_PREFIX}-header`,
  headerTitle: `${PRODUCT_SHOW_CARD_PREFIX}-headerTitle`,
  headerTitleContainer: `${PRODUCT_SHOW_CARD_PREFIX}-headerTitleContainer`,
  headerPrice: `${PRODUCT_SHOW_CARD_PREFIX}-headerPrice`,
  headerPriceOriginal: `${PRODUCT_SHOW_CARD_PREFIX}-headerPriceOriginal`,
  headerPriceDiscounted: `${PRODUCT_SHOW_CARD_PREFIX}-headerPriceDiscounted`,
  form: `${PRODUCT_SHOW_CARD_PREFIX}-form`,
  size: `${PRODUCT_SHOW_CARD_PREFIX}-size`,
  submit: `${PRODUCT_SHOW_CARD_PREFIX}-submit`,
  radioContainer: `${PRODUCT_SHOW_CARD_PREFIX}-radioContainer`,
  material: `${PRODUCT_SHOW_CARD_PREFIX}-material`,
  rating: `${PRODUCT_SHOW_CARD_PREFIX}-rating`,
  ratingLabel: `${PRODUCT_SHOW_CARD_PREFIX}-ratingLabel`,
  ratingStars: `${PRODUCT_SHOW_CARD_PREFIX}-ratingStars`,
  ratingStarsBase: `${PRODUCT_SHOW_CARD_PREFIX}-ratingStarsBase`,
  ratingStarsOverlay: `${PRODUCT_SHOW_CARD_PREFIX}-ratingStarsOverlay`,
  shipping: `${PRODUCT_SHOW_CARD_PREFIX}-shipping`,
  shippingIcon: `${PRODUCT_SHOW_CARD_PREFIX}-shippingIcon`,
  shippingTimeRange: `${PRODUCT_SHOW_CARD_PREFIX}-shippingTimeRange`,
  shippingPrice: `${PRODUCT_SHOW_CARD_PREFIX}-shippingPrice`,
};

const Root = styled(Container, {
  name: PRODUCT_SHOW_CARD_PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme: { spacing } }) => ({
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(3),
  [`& .${accordionClasses.root}`]: {
    boxShadow: 'none',
    '&::before': {
      display: 'none',
    },
  },
  [`& .${accordionDetailsClasses.root}`]: {
    boxShadow: 'none',
  },
  [`& .${accordionSummaryClasses.root}`]: {
    minHeight: 'auto',
    fontWeight: 700,
  },
  [`& .${accordionSummaryClasses.expanded}`]: {
    margin: 0,
    minHeight: 'auto',
  },
  [`& .${accordionSummaryClasses.content}`]: {
    margin: 0,
    // minHeight: 'auto',
  },
  [`& .${productShowCardClasses.carouselWrapper}`]: {
    position: 'relative',
  },
  [`& .${productShowCardClasses.carousel}`]: {
    height: 650,
    zIndex: 0,
  },
  [`& .${productShowCardClasses.carouselIndicator}`]: {
    zIndex: 1,
    position: 'absolute',
    bottom: spacing(4),
    width: '100%',
    [`& .${iconButtonClasses.root}`]: {
      padding: spacing(0.5),
    },
    [`& .${svgIconClasses.root}`]: {
      color: '#1c1c1e',
      fontSize: spacing(1),
    },
  },
  [`& .${productShowCardClasses.carouselIndicatorActive}`]: {
    [`& .${svgIconClasses.root}`]: {
      fontSize: spacing(1.5),
    },
  },
  [`& .${productShowCardClasses.carouselItem}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  [`& .${productShowCardClasses.carouselImage}`]: {
    height: '100%',
    width: 'auto',
  },
  [`& .${productShowCardClasses.carouselClose}`]: {
    top: spacing(2),
    left: spacing(2),
    position: 'absolute',
    color: '#222224',
  },
  [`& .${productShowCardClasses.carouselCart}`]: {
    top: spacing(2),
    right: spacing(2),
    position: 'absolute',
    color: '#222224',
  },
  [`& .${productShowCardClasses.carouselShare}`]: {
    top: spacing(7),
    right: spacing(2),
    position: 'absolute',
    color: '#222224',
  },
  [`& .${productShowCardClasses.carouselLike}`]: {
    bottom: spacing(2),
    right: spacing(2),
    position: 'absolute',
    color: '#d70015',
    backgroundColor: '#fff',
    boxShadow: `0 ${spacing(0.5, 0.5)} rgba(0,0,0,.2)`,
  },
  [`& .${productShowCardClasses.header}`]: {
    padding: spacing(0, 2),
    [`& .${cardHeaderClasses.content}`]: {
      display: 'flex',
      flexDirection: 'column-reverse',
    },

    [`& .${cardHeaderClasses.title}`]: {
      [`& .${productShowCardClasses.headerTitleContainer}`]: {
        display: 'flex',
        justifyContent: 'space-between',
        lineHeight: 1.5,
        fontSize: spacing(2),
        [`& .${productShowCardClasses.headerPrice}`]: {
          display: 'flex',
          gap: spacing(2),
          [`& .${productShowCardClasses.headerPriceOriginal}`]: {},
          [`& .${productShowCardClasses.headerPriceDiscounted}`]: {
            color: '#d70015',
            fontWeight: 700,
          },
        },
      },
    },
    [`& .${cardHeaderClasses.subheader}`]: {
      lineHeight: 1.5,
      marginBottom: spacing(0.5),
      fontSize: spacing(1.5),
    },
  },
  [`& .${productShowCardClasses.form}`]: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(4),
    [`& .${productShowCardClasses.size}`]: {
      margin: spacing(0, 2),
      '& fieldset': {
        '& legend': {
          opacity: 1,
          '& span': {
            position: 'absolute',
            top: -6,
            backgroundColor: '#fff',
          },
        },
      },
    },
    [`& .${productShowCardClasses.submit}`]: {
      margin: spacing(0, 2),
      backgroundColor: '#1c1c1e',
      borderRadius: spacing(2.5),
      color: '#fff',
      textTransform: 'none',
    },
    [`& .${productShowCardClasses.radioContainer}`]: {
      maxWIdth: '100%',
      [`& .${formLabelClasses.root}`]: {
        margin: spacing(0, 2),
      },
      [`& .${formGroupClasses.root}`]: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        overflow: 'overlay',
        gap: spacing(2),
        marginTop: spacing(1),
        padding: spacing(0.5, 0, 0.5, 2),
        maxWidth: '100%',
        '&::scrollbar': {
          display: 'none',
        },
      },
      [`& .${cardClasses.root}`]: {
        overflow: 'visible',
        padding: '1px',
        [`&:has(.Mui-checked)`]: {
          background: '#9291ec',
          padding: '1px',
          borderRadius: 0,
        },
        [`& .${radioClasses.root}`]: {
          display: 'none',
        },
        [`& .${formControlLabelClasses.root}`]: {
          margin: 0,
        },
      },
      [`& .${cardMediaClasses.root}`]: {
        width: 95,
        height: 95,
      },
    },
    [`& .${productShowCardClasses.material}`]: {
      [`& .${formGroupClasses.root}`]: {
        margin: 0,
      },
      [`& .${accordionDetailsClasses.root}`]: {
        padding: 0,
      },
      '& legend': {
        display: 'none',
      },
    },
    [`& .${productShowCardClasses.rating}`]: {
      margin: spacing(0, 2),
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: 700,
      fontSize: spacing(2),
      [`& .${svgIconClasses.root}`]: {
        fontSize: spacing(2),
        color: '#5e5ce6',
      },
      [`& .${productShowCardClasses.ratingStars}`]: {
        position: 'relative',
      },
      [`& .${productShowCardClasses.ratingStarsBase}`]: {
        position: 'relative',
      },
      [`& .${productShowCardClasses.ratingStarsOverlay}`]: {
        position: 'absolute',
        top: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      },
    },
  },
  [`& .${productShowCardClasses.shipping}`]: {
    display: 'flex',
    gap: spacing(2),
    fontWeight: 700,
    [`& .${productShowCardClasses.shippingIcon}`]: {},
    [`& .${productShowCardClasses.shippingTimeRange}`]: {
      flexGrow: 1,
    },
    [`& .${productShowCardClasses.shippingPrice}`]: {
      color: '#4de072',
    },
  },
}));
