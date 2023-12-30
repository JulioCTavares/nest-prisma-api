import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserPayload } from '../jwt-strategy';

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user as UserPayload;
  },
);
