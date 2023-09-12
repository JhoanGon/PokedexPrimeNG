import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { PokemonDetail } from 'src/app/core/models/class/PokemonDetail';
import { PokemonList } from 'src/app/core/models/class/PokemonList';
import { PokemonService } from 'src/app/core/services/pokemon-services/pokemon.service';
import { SearchServiceService } from 'src/app/core/services/searchService/search-service.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  private evolutionSubscription: Subscription | undefined;
  pokemonDetail: PokemonDetail[] = [];
  pokemons: any;
  offset: number;
  list: PokemonList[] = [];
  currentPage: number;
  itemsPerPage: number = 15;
  pokemonTotal: number;
  hidePagination: boolean;

  evolutionPokemonData: any = "";
  evolutionPokemon: any = "";
  evolutionId: any = "";
  evolutionData: any = "";
  lote: number = 1;

  lotesData: { [lote: number]: PokemonList[] } = {};

  constructor(
    private pokemonService: PokemonService,
    private searchService: SearchServiceService
  ) {}

  ngOnInit(): void {
    this.currentPage = Number(localStorage.getItem('currentPage')) || 1;
    this.getPokemonList();
    this.pokemonService.getAllPokemonSize().subscribe(size => {
      this.pokemonTotal = size;
    });
  }

  ngOnDestroy(): void {
    if (this.evolutionSubscription) {
      this.evolutionSubscription.unsubscribe();
    }
  }

  getPokemonList(): void {
    this.searchService.filteredPokemons$.subscribe(value => {
      if (value.toString() !== '') {
        const searchTerm = value.toString().replace(' ','-');
        this.loadFilteredPokemon(searchTerm);
        this.hidePagination = true;
      } else {
        this.hidePagination = false;
        this.loadNextBatch();
      }
    });
  }

  loadFilteredPokemon(pokemonName: string): void {
    this.pokemonService.getPokemonByNamePartial(pokemonName).subscribe(namePokemon => {
      this.list = namePokemon;
      this.getPokemon(this.list);
    });
  }

  loadNextBatch(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.pokemonService.getPokemonList(startIndex, this.itemsPerPage).subscribe(pokemonList => {
      this.list = pokemonList;
      this.getPokemon(this.list);
    });
  }

  loadMore(): void {
    this.loadNextBatch();
  }

  onPageChange(event: any): void {
    this.currentPage = event.page + 1;
    localStorage.setItem('currentPage', this.currentPage.toString());
    this.loadNextBatch();
  }

  private getPokemon(list: PokemonList[]): void {
    const arr: Observable<PokemonDetail>[] = [];
    list.forEach((value: PokemonList) => {
      arr.push(this.pokemonService.getPokemonDetail(value.name));
    });

    forkJoin([...arr]).subscribe((pokemons: PokemonDetail[]) => {
      this.pokemons = pokemons;
      this.offset += 1;
    });
  }
}
