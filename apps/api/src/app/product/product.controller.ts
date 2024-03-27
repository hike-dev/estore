import { ProductGetRequest, ProductGetResponse } from '@estore/shared';
import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';

import { resWrapperUtil } from '../../utils/res-wrapper.util';

import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(@Query() range: ProductGetRequest, @Res() res: Response) {
    const [data, count] = await this.productService.findAll(range);
    if (range) {
      res.setHeader(
        'Content-Range',
        `products ${range.offset}-${range.offset + range.limit}/${count}`,
      );
    }

    return resWrapperUtil(res, data, ProductGetResponse);
  }
}
