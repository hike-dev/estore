import { IProduct, ProductGetRequest } from '@estore/shared';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  async findAll({
    offset,
    limit,
  }: ProductGetRequest): Promise<[IProduct[], number]> {
    const count = Number(limit);
    const products = faker.helpers.multiple<IProduct>(
      () => ({
        id: faker.string.uuid(),
        title: faker.commerce.productName(),
        brand: faker.company.name(),
        details: faker.lorem.words(),
        like: faker.datatype.boolean(),
        photos: faker.helpers.multiple(
          () => faker.image.urlPicsumPhotos({ height: 360, width: 250 }),
          { count: 10 },
        ),
        price: +faker.commerce.price({ dec: 0 }),
        discount: faker.number.int({ max: 9, min: 0 }) * 10,
        rating: {
          average: faker.number.float({ max: 5, min: 0 }),
          count: faker.number.int(),
          voted: faker.datatype.boolean(),
        },
        shipping: {
          timeRange: [2, 4],
          price: +faker.commerce.price({ dec: 0, min: 10, max: 1000 }),
        },
        options: [
          {
            title: faker.helpers.arrayElement(['Material', 'Color', 'Size']),
            type: faker.helpers.arrayElement(['image', 'text', 'color']),
            //  faker.color.rgb()
          },
        ],
        tags: faker.helpers.multiple(() => faker.word.sample(), {
          count: {
            min: 0,
            max: 2,
          },
        }),
      }),
      { count },
    );

    return [products, count];
  }
}
