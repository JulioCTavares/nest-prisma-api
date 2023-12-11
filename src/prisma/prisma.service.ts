import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class PrismaService
  extends PrismaClient
  implements OnModuleDestroy, OnModuleInit
{
  constructor() {
    super({
      log: ['query', 'warn', 'error'],
    });
  }
  onModuleDestroy() {
    return this.$disconnect;
  }
  onModuleInit() {
    return this.$connect;
  }
}
