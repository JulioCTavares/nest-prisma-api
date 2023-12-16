import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma';
import {
  AuthenticateController,
  CreateAccountController,
  CreateQuestionController,
  GetRecentQuestionsController,
} from '@/controllers';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/auth';
import { EnvSchema } from './env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => EnvSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    GetRecentQuestionsController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
