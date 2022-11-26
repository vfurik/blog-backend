import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { admin } from './constants/users.constat';

describe('Auth controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    app.close();
  });

  it('/auth/login (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(admin)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.access_token).toBeDefined();
      });
  });

  it('/auth/login (POST) - failed', () => {
    request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...admin, password: 'wrong_password' })
      .expect(401, {
        statusCode: 401,
        message: 'Incorrect email or password',
        error: 'Unauthorized',
      });
  });

  it('/auth/register (POST) - failed', async () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({ emai: 'email' })
      .expect(400)
      .then(({ body }: request.Response) => {
        expect(body.statusCode).toEqual(400);
        expect(body.error).toEqual('Bad Request');
      });
  });
});
