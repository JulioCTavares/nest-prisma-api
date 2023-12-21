import { AppModule } from '@/app.module';
import { PrismaService } from '@/prisma';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { hash } from 'bcrypt';
import request from 'supertest';

describe('Authenticate (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /sessions', async () => {
    await prisma.user.create({
      data: {
        name: 'Julio',
        email: 'julio@test.com',
        password: await hash('123456', 10),
      },
    });

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'julio@test.com',
      password: '123456',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      access_token: expect.any(String),
    });
  });
});
