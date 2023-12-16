import { JwtAuthGuard } from '@/auth';
import { Controller, Post, UseGuards } from '@nestjs/common';

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor() {}

  @Post()
  async handle() {
    return 'ok';
  }
}
