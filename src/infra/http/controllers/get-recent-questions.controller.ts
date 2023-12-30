import { JwtAuthGuard } from '@/infra/auth';
import { PrismaService } from '@/infra/database/prisma';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes';

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1));

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema);

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>;

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class GetRecentQuestionsController {
  constructor(private prisma: PrismaService) { }

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamsSchema,
  ) {
    const pageSize = 10;

    const questions = await this.prisma.question.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      questions,
    };
  }
}
