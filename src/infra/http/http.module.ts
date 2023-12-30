import { Module } from '@nestjs/common';
import {
  CreateAccountController,
  AuthenticateController,
  CreateQuestionController,
  GetRecentQuestionsController,
} from './controllers';
import { PrismaService } from '../prisma';

@Module({
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    GetRecentQuestionsController,
  ],
  providers: [PrismaService],
})
export class HttpModule { }
