import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('App e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/health', () => request(app.getHttpServer()).get('/health').expect(200));
  it('/auth/login unauthorized', () => request(app.getHttpServer()).post('/auth/login').send({ email: 'x@y.z', password: 'badbad' }).expect(401));
});
