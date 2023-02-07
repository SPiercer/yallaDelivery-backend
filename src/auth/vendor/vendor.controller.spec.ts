import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common/interfaces';
import { AppModule } from '../../app.module';
import * as request from 'supertest';
jest.clearAllTimers();
jest.useFakeTimers();
jest.setTimeout(50000);

console.log(process.env.NODE_ENV);
let app: INestApplication;

beforeAll(async () => {
  jest.useFakeTimers({ timerLimit: 50000 });
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});
describe('advertiser auth controller', () => {
  it('should login successful', () => {
    return request(app.getHttpServer())
      .post('/auth/advertiser/login')
      .send({
        email: 'Valentina.Stanton75@yahoo.com',
        password: 'password',
      })
      .expect(201)
      .expect((res) => expect(res.body).toContain('access_token'));
  });

  it('should fail the login', () => {
    return request(app.getHttpServer())
      .post('/auth/advertiser/login')
      .send({
        email: 'Valentina.Stanton75@yahoo.com',
        password: 'INCORRECT PASSWORD ?!',
      })
      .expect(401);
  });
});
afterAll(async () => {
  await app.close();
});
