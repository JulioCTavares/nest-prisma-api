import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma';
import { CreateAccountController } from '@/controllers';

@Module({
  imports: [],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}
