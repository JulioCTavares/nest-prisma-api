import { PrismaService } from '@/infra/prisma';
import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateSchema = z.infer<typeof authenticateBodySchema>;

@Controller('/sessions')
export class AuthenticateController {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) { }

  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateSchema) {
    const { email, password } = body;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User credentials does not match');
    }

    const isPassowrdValid = await compare(password, user.password);

    if (!isPassowrdValid) {
      throw new UnauthorizedException('User credentials does not match');
    }

    const token = this.jwt.sign({ sub: user.id });

    return {
      access_token: token,
    };
  }
}
