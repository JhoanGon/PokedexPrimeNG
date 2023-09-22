import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { PokemonList } from '../../models/class/PokemonList';
import { PokemonDetail } from '../../models/class/PokemonDetail';
import { EvolutionChain } from '../../models/class/evolutionPokemon';
import { PokemonSpecies } from '../../models/class/pokemonSpecies';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private baseUrl = 'https://pokeapi.co/api/v2/';

    constructor(private http: HttpClient) { }


    getPokemonList(offset: number, limit: number = 1010) : Observable<PokemonList[]> {
      return this.http.get<PokemonList[]>(this.baseUrl + 'pokemon?limit=' + limit + '&offset=' + offset)
        .pipe(
            map((x: any) => x.results)
        );
    }

    getPokemonDetail(pokemon: number | string): Observable<PokemonDetail> {
        return this.http.get<PokemonDetail>(this.baseUrl + 'pokemon/' + pokemon);
    }

    getPokemonEvolution(pokemon: number): Observable<EvolutionChain> {
      return this.http.get<EvolutionChain>(this.baseUrl + 'evolution-chain/' + pokemon);
    }

    getAllPokemonSize(): Observable<number> {
      return this.http.get<any>(this.baseUrl + 'pokemon?limit=1010')
        .pipe(
          map((response: any) => response.results.length)
        );
    }

    getPokemonListName(): Observable<string[]> {
      return this.http.get<any>(this.baseUrl + 'pokemon?limit=1010')
        .pipe(
          map((response: any) => response.results.map((pokemon: any) => pokemon.name))
        );
    }

    getPokemonByNamePartial(partialName: string): Observable<PokemonDetail[]> {
      return this.http.get<any>(this.baseUrl + 'pokemon?limit=1010')
        .pipe(
          map((response: any) => response.results.filter((pokemon: any) =>
            pokemon.name.includes(partialName.toLowerCase()))
          ),
          switchMap((filteredResults: any[]) =>
            this.getPokemonDetails(filteredResults.map(pokemon => pokemon.name))
          )
        );
    }

    getPokemonDetails(pokemonNames: string[]): Observable<PokemonDetail[]> {
      const observables = pokemonNames.map(name => this.getPokemonDetail(name));
      return forkJoin(observables);
    }

    getPokemonSpeciesDetail(pokemon: number): Observable<PokemonSpecies>{
      return this.http.get<PokemonSpecies>(this.baseUrl + 'pokemon-species/' + pokemon);
    }
}
