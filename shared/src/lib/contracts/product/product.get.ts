import { Expose } from 'class-transformer';
import { IsNumber, IsNumberString } from 'class-validator';

import {
  IProduct,
  IProductOption,
  IProductRating,
  IProductShipping,
} from '../../interfaces';

export class ProductGetRequest {
  @IsNumberString()
  offset: number;

  @IsNumberString()
  limit: number;
}

export class ProductGetResponse implements IProduct {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  brand: string;

  @Expose()
  details: string;

  @Expose()
  photos: string[];

  @Expose()
  like: boolean;

  @Expose()
  price: number;

  @Expose()
  discount?: number;

  @Expose()
  rating: IProductRating;

  @Expose()
  options: IProductOption[];

  @Expose()
  shipping: IProductShipping;
}
