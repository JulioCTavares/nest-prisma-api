import { PrismaService } from '@/infra/prisma';
import {
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes';

const createAccountSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreateAccountInput = z.infer<typeof createAccountSchema>;

@Controller('/accounts')
export class CreateAccountController {
  constructor(private readonly prisma: PrismaService) { }

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountSchema))
  async handle(@Body() body: CreateAccountInput) {
    const { name, email, password } = body;

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new ConflictException('User with same email already exists');
    }

    const hashedPassword = await hash(password, 10);

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }
}
