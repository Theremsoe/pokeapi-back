import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { PokeApiController } from './pokeapi.controller';
import { PokeApiService } from './pokeapi.service';
import { PokeApiCollection, Pokemon } from './pokeapi.interface';

describe('Poke Controller', (): void => {
  describe('get', (): void => {
    const response: PokeApiCollection<Pokemon> = {
      count: 10,
      next: null,
      previous: null,
      results: [],
    };
    const http: HttpService = new HttpService();
    const service: PokeApiService = new PokeApiService(http);
    const controller: PokeApiController = new PokeApiController(service);

    const spy = jest
      .spyOn(service, 'get')
      .mockImplementation(() => of(response));

    it('should keep the params passed by arguments (empty scenario)', (done): void => {
      controller.get({}).subscribe((): void => {
        expect(spy).toHaveBeenLastCalledWith({});
        done();
      });
    });

    it('should keep the params passed by arguments', (done): void => {
      controller.get({ limit: '10' }).subscribe((): void => {
        expect(spy).toHaveBeenLastCalledWith({ limit: '10' });
        done();
      });
    });

    it('should return Dummy Data when called successfully', (done): void => {
      service.get({}).subscribe((res): void => {
        expect(res).toEqual(response);
        done();
      });
    });
  });
});
