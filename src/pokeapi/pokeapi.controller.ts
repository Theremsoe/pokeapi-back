import { Controller, Get, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PokeApiService } from './pokeapi.service';
import { PokeApiCollection, Pokemon } from './pokeapi.interface';

@Controller('api/v1/pokeapi')
export class PokeApiController {
  public constructor(private poke: PokeApiService) {}

  @Get()
  public get(@Query() query): Observable<PokeApiCollection<Pokemon>> {
    return this.poke.get(query);
  }
}
