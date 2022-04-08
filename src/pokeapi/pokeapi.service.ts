import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { PokeApiCollection, Pokemon } from './pokeapi.interface';

type PokeCollection = PokeApiCollection<Pokemon>;

@Injectable()
export class PokeApiService {
  public constructor(protected readonly http: HttpService) {}

  public get(params: Record<string, string> = {}): Observable<PokeCollection> {
    return this.http
      .get('https://pokeapi.co/api/v2/pokemon', { params })
      .pipe(map((response: AxiosResponse) => response.data));
  }
}
