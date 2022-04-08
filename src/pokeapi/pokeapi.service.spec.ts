import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { PokeApiService } from './pokeapi.service';
import { of } from 'rxjs';

describe('PokeApi Service', (): void => {
  describe('Test pokemon get', () => {
    const params: Record<string, string> = {
      limit: '10',
      offset: '0',
    };

    const response: AxiosResponse = {
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
      data: 'Components',
    };

    const http: HttpService = new HttpService();
    const service: PokeApiService = new PokeApiService(http);
    const spy = jest.spyOn(http, 'get').mockImplementation(() => of(response));

    it('should keep the params passed by arguments (empty scenario)', (done): void => {
      service.get({}).subscribe((): void => {
        expect(spy).toHaveBeenLastCalledWith(
          'https://pokeapi.co/api/v2/pokemon',
          { params: {} },
        );
        done();
      });
    });

    it('should keep the params passed by arguments', (done): void => {
      service.get(params).subscribe((): void => {
        expect(spy).toHaveBeenLastCalledWith(
          'https://pokeapi.co/api/v2/pokemon',
          { params },
        );
        done();
      });
    });

    it('should return Dummy Data when called successfully', (done): void => {
      service.get(params).subscribe((res): void => {
        expect(res).toEqual(response.data);
        done();
      });
    });
  });
});
