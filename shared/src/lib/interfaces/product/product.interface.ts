import { IProductOption } from './product-option.interface';
import { IProductRating } from './product-rating.interface';
import { IProductShipping } from './product-shipping.interface';

export interface IProduct {
  id: number;
  title: string;
  brand: string;
  details: string;
  photos: string[];
  like: boolean;
  price: number;
  discount?: number;
  rating: IProductRating;
  options: IProductOption[];
  shipping: IProductShipping;
}
