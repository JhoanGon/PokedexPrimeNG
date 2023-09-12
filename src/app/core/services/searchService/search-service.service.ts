import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  private filteredPokemonsSubject = new BehaviorSubject<any[]>([]);
  filteredPokemons$ = this.filteredPokemonsSubject.asObservable();

  setSearchResults(pokemons: any[]) {
    this.filteredPokemonsSubject.next(pokemons);
  }
}
