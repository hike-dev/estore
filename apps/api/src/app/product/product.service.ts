import { IProduct, ProductGetRequest } from '@estore/shared';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  async findAll({
    offset,
    limit,
  }: ProductGetRequest): Promise<[IProduct[], number]> {
    const count = Number(offset) + Number(limit);
    const products = faker.helpers.multiple<IProduct>(
      () => ({
        id: faker.number.int(),
        title: faker.commerce.productName(),
        brand: faker.company.name(),
        details: faker.lorem.words(),
        like: faker.datatype.boolean(),
        photos: faker.helpers.multiple(
          () => faker.image.urlPicsumPhotos({ height: 50, width: 100 }),
          { count: 10 },
        ),
        price: faker.number.int(),
        discount: faker.number.int({ max: 100, min: 0 }),
        rating: {
          average: faker.number.float({ max: 5, min: 0 }),
          count: faker.number.int(),
          voted: faker.datatype.boolean(),
        },
        shipping: {
          timeRange: [2, 4],
          price: +faker.commerce.price({ dec: 0 }),
        },
        options: [
          {
            title: faker.helpers.arrayElement(['Material', 'Color', 'Size']),
            type: faker.helpers.arrayElement(['image', 'text', 'color']),
            //  faker.color.rgb()
          },
        ],
      }),
      { count },
    );

    return [products, count];
  }
}
