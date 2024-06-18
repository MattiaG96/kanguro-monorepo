import { HttpException } from '@nestjs/common';
import { isRequestAuth } from './authToken';

export const checkUserAuth = (auth?: string) => {
  const isAuth = isRequestAuth(auth);
  if (!isAuth) {
    throw new HttpException(
      "You're not authorized to request the delivery points.",
      500,
    );
  }
};
