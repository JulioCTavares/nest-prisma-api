import { CurrentUser, JwtAuthGuard, UserPayload } from '@/auth';
import { PrismaService } from '@/prisma';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { z } from 'zod';

const CreateQuestionSchema = z.object({
  title: z.string(),
  content: z.string(),
});

type CreateQuestionInput = z.infer<typeof CreateQuestionSchema>;

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @CurrentUser() userPayload: UserPayload,
    @Body() body: CreateQuestionInput,
  ) {
    const userId = userPayload.sub;

    const { title, content } = body;

    const slug = this.normalizesSlug(title);

    await this.prisma.question.create({
      data: {
        title,
        content,
        slug,
        authorId: userId,
      },
    });
  }

  private normalizesSlug(tittle: string): string {
    return tittle
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '');
  }
}
