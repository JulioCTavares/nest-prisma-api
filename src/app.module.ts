import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma';
import { CreateAccountController } from '@/controllers';
import { ConfigModule } from '@nestjs/config';
import { EnvSchema } from './env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => EnvSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}
