import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { admin } from './constants/users.constat';
import * as request from 'supertest';

describe('Users controller (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const { body } = await request(app.getHttpServer()).post('/auth/login').send(admin);
    token = body.access_token;
  });

  afterEach(() => {
    app.close();
  });

  it('/users (GET) - success', async () => {
    return request(app.getHttpServer())
      .get('/users')
      .set('Authorization', 'Bearer ' + token)
      .send({ emai: 'email' })
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body[0]).toHaveProperty('id');
        expect(body[0]).toHaveProperty('email');
        expect(body[0]).toHaveProperty('active');
        expect(body[0]).toHaveProperty('role');
        expect(body[0]).toHaveProperty('createdAt');
        expect(body[0]).toHaveProperty('updatedAt');
      });
  });
});
