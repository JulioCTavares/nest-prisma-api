import { Module } from '@nestjs/common';
import {
  CreateAccountController,
  AuthenticateController,
  CreateQuestionController,
  GetRecentQuestionsController,
} from './controllers';
import { DatabaseModule } from '../database';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    GetRecentQuestionsController,
  ],
})
export class HttpModule { }
