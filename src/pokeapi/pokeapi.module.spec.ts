import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PokeapiModule } from './pokeapi.module';
import { PokeApiService } from './pokeapi.service';
import * as request from 'supertest';

describe('Poke API Module', (): void => {
  let app: INestApplication;
  const service = { get: () => ['test'] };

  describe('Using api/v1/pokeapi', (): void => {
    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [PokeapiModule],
      })
        .overrideProvider(PokeApiService)
        .useValue(service)
        .compile();

      app = moduleRef.createNestApplication();
      await app.init();
    });

    it(`/GET`, () => {
      return request(app.getHttpServer())
        .get('/api/v1/pokeapi')
        .expect(200)
        .expect(['test']);
    });

    afterAll(async () => {
      await app.close();
    });
  });
});
