import { IProductColor } from './product-color.interface';
import { IProductMaterial } from './product-material.interface';
import { IProductRating } from './product-rating.interface';
import { IProductShipping } from './product-shipping.interface';
import { IProductSize } from './product-size.interface';

export interface IProduct {
  id: string;
  title: string;
  brand: string;
  details: string;
  photos: string[];
  like: boolean;
  price: number;
  discount?: number;
  rating: IProductRating;
  shipping: IProductShipping;
  tags: string[];
  availableSize: IProductSize[];
  availableColor: IProductColor[];
  availableMaterial: IProductMaterial[];
}
