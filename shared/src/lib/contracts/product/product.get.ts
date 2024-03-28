import { Expose } from 'class-transformer';
import { IsNumberString } from 'class-validator';

import {
  IProduct,
  IProductColor,
  IProductMaterial,
  IProductRating,
  IProductShipping,
  IProductSize,
} from '../../interfaces';

export class ProductGetRequest {
  @IsNumberString()
  offset: number;

  @IsNumberString()
  limit: number;
}

export class ProductGetResponse implements IProduct {
  @Expose()
  id: string;

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
  availableSize: IProductSize[];

  @Expose()
  availableColor: IProductColor[];

  @Expose()
  availableMaterial: IProductMaterial[];

  @Expose()
  shipping: IProductShipping;

  @Expose()
  tags: string[];
}
