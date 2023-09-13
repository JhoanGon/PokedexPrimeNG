import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, catchError, throwError } from 'rxjs';
import { PokemonService } from 'src/app/core/services/pokemon-services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  private evolutionSubscription: Subscription | undefined;
  pokemonId: any = "";
  pokemons: any = " ";
  swicthShiny: boolean = false;
  swicth3D: boolean = false;
  idChain: number = 0;
  evolutionPokemonData: any = "";
  evolutionPokemon: any = "";
  sizeEvolution: string = "";

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.pokemonId = params['pokemon'];
    });
    this.getPokemon(this.pokemonId);
    this.getChainEvolution();
  }

  getPokemon(pokemon: number | string){
    this.pokemonService.getPokemonDetail(pokemon).subscribe(data =>{
      this.pokemons = data;
    });
  }

  getPokemonImageURL(pokemon: any): string {
    let url: string;

    switch (true) {
      case !this.swicthShiny && !this.swicth3D:
        url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon}.png`;
        break;

      case this.swicthShiny && !this.swicth3D:
        url = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/official-artwork/shiny/${pokemon}.png?raw=true`;
        break;

      case this.swicthShiny && this.swicth3D:
        url = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/home/shiny/${pokemon}.png?raw=true`
        break;

      case !this.swicthShiny && this.swicth3D:
        url = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/home/${pokemon}.png?raw=true`;
        break;

      default:
        url = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/home/shiny/${pokemon}.png?raw=true`;
        break;
    }

    return url;
  }

  toggleShiny() {
    this.swicthShiny = !this.swicthShiny;
  }

  toggle3D() {
    this.swicth3D = !this.swicth3D;
  }

  handleImageError(event: any) {
    event.target.src = '';
  }
  getPrincipalBorderClass(list: any[]) {
    const primaryType = list.filter((x) => x.slot === 1 )[0]?.type.name;
    return primaryType;
  }

  getChainEvolution() {
    if(this.pokemonId <= 1010){
      this.pokemonService.getPokemonSpeciesDetail(this.pokemonId).subscribe((evolutionChain) => {
        this.extractEvolutionChainNumber(evolutionChain.evolution_chain.url).then((idChain) => {
          this.idChain = idChain;
          this.evolutionSubscription = this.pokemonService.getPokemonEvolution(this.idChain).pipe(
            catchError((error) => {
              console.error('Error 404: Recurso no encontrado', error);
              return throwError(() => new Error('Error 404: Recurso no encontrado'));
            })
          ).subscribe({
            next: (data) => {
              this.evolutionPokemonData = data;
              this.evolutionPokemon = this.getDataEvolution(this.evolutionPokemonData.chain);
              this.sizeEvolution = `repeat(${this.evolutionPokemon.length}, minmax(250px, 1fr))`;
            }
          });
        }).catch((error) => {
          console.log("lote no encontrado")
        });
      });
    }else{
      console.log("No hay datos")
    }
  }

  getDataEvolution(chain: any): any[] {
    const evolutions: any[] = [];
    const parts = chain.species.url.split('/');
    const lastPart = parts[parts.length - 2];

    if (chain.species) {
      evolutions.push({ name: chain.species.name, id: lastPart});
    }

    if (chain.evolves_to && chain.evolves_to.length > 0) {
      chain.evolves_to.forEach((evolve: any) => {
        evolutions.push(...this.getDataEvolution(evolve));
      });
    }
    return evolutions;
  }

  async extractEvolutionChainNumber(url: string): Promise<number> {
    const parts = url.split('/');
    const lastPart = parts[parts.length - 2];

    if (lastPart && !isNaN(+lastPart)) {
      return +lastPart;
    }

    return parseInt(lastPart);
  }

  introPage(){
    this.router.navigate(['pokedex']);
  }
}
