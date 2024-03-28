import {
  IProduct,
  IProductColor,
  IProductMaterial,
  IProductSize,
  ProductGetRequest,
} from '@estore/shared';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

const productColorGenerate = (): IProductColor => {
  const color = faker.color.human();
  return {
    image: faker.image.urlLoremFlickr({
      width: 95,
      height: 95,
      category: color,
    }),
    value: faker.color.human(),
  };
};
const productMaterialGenerate = (): IProductMaterial => {
  const material = faker.commerce.productMaterial();
  return {
    image: faker.image.urlLoremFlickr({
      width: 95,
      height: 95,
      category: material,
    }),
    value: material,
  };
};
const productSizeGenerate = (): IProductSize => {
  const size = faker.number.int({ min: 20, max: 30 });
  return {
    label: `${size}`,
    value: size,
  };
};

const productGenerate = (): IProduct => ({
  id: faker.string.uuid(),
  title: faker.commerce.productName(),
  brand: faker.company.name(),
  details: faker.lorem.paragraphs(),
  like: faker.datatype.boolean(),
  photos: faker.helpers.multiple(
    () => faker.image.urlPicsumPhotos({ height: 650, width: 450 }),
    { count: 10 },
  ),
  price: +faker.commerce.price({ dec: 0 }),
  discount: faker.number.int({ max: 9, min: 0 }) * 10,
  rating: {
    average: faker.number.float({ max: 5, min: 0 }),
    count: faker.number.int({ min: 20, max: 1000 }),
    voted: faker.datatype.boolean(),
  },
  shipping: {
    timeRange: [2, 4],
    price: +faker.commerce.price({ dec: 0, min: 0, max: 10 }) * 10,
  },
  availableSize: _.uniqBy(
    faker.helpers.multiple(productSizeGenerate, {
      count: {
        min: 1,
        max: 10,
      },
    }),
    'value',
  ),
  availableColor: _.uniqBy(
    faker.helpers.multiple(productColorGenerate, {
      count: {
        min: 1,
        max: 10,
      },
    }),
    'value',
  ),
  availableMaterial: _.uniqBy(
    faker.helpers.multiple(productMaterialGenerate, {
      count: {
        min: 1,
        max: 10,
      },
    }),
    'value',
  ),

  tags: faker.helpers.multiple(() => faker.word.sample(), {
    count: {
      min: 0,
      max: 2,
    },
  }),
});
@Injectable()
export class ProductService {
  async findAll({
    offset,
    limit,
  }: ProductGetRequest): Promise<[IProduct[], number]> {
    const count = Number(limit);
    const products = faker.helpers.multiple<IProduct>(productGenerate, {
      count,
    });

    return [products, count];
  }

  async findOne(id: string): Promise<IProduct> {
    return productGenerate();
  }
}
