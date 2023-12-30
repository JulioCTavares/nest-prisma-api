import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/infra/auth';
import { EnvSchema } from '@/env';
import { HttpModule } from '@/infra/http';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => EnvSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
  ],
})
export class AppModule { }
