import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PokeApiController } from './pokeapi.controller';
import { PokeApiService } from './pokeapi.service';

@Module({
  imports: [HttpModule],
  providers: [PokeApiService],
  controllers: [PokeApiController],
})
export class PokeapiModule {}
