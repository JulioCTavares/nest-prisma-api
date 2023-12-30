import { PaginationParams } from '@/core/repositories';
import { QuestionsRepository } from '@/domain/forum/application/repositories';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper';

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(private prisma: PrismaService) { }

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    });

    if (!question) {
      return null;
    }

    return PrismaQuestionMapper.toDomain(question);
  }
  findBySlug(slug: string): Promise<Question | null> {
    throw new Error('Method not implemented.');
  }
  findManyRecent(params: PaginationParams): Promise<Question[]> {
    throw new Error('Method not implemented.');
  }
  save(question: Question): Promise<void> {
    throw new Error('Method not implemented.');
  }
  create(question: Question): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(question: Question): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
