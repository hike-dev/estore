import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Response } from 'express';

export const resWrapperUtil = <T extends { new (...args: unknown[]): unknown }>(
  res: Response,
  data: T | T[] | object | object[],
  Class: T,
) => {
  res.json(
    instanceToPlain(
      plainToInstance(Class, data, {
        excludeExtraneousValues: true,
      }),
    ),
  );
};
