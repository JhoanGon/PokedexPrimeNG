import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-cards-pokemons',
  templateUrl: './cards-pokemons.component.html',
  styleUrls: ['./cards-pokemons.component.scss']
})
export class CardsPokemonsComponent {

  @Input() pokemons: any;

  constructor(
    private readonly router: Router
  ){}

  getPrincipalBorderClass(list: any[]) {
    const primaryType = list.filter((x) => x.slot === 1 )[0]?.type.name;
    return primaryType;
  }

  heigthPokemon(){
    let heigthPoke = "";

    if(this.pokemons.height / 10 > 0.9){
      heigthPoke = this.pokemons.height / 10 + " m"
    }else{
      heigthPoke = this.pokemons.height * 10 + " cm"
    }
    return (heigthPoke);
  }

  sizeNamePokemon(name: string): string{
    return name.length > 10 ? '15px' : '20px';
  }

  replaceName(name: string): string {
    return name.replace(/-/g, ' ');
  }

  getPokemonImageURL(pokemon: any): string {
   return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  }

  handleImageError(event: any) {
    event.target.src = '';
  }

  onPokemonClick() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        pokemon: this.pokemons.id,
      }
    };
    this.router.navigate(['/pokedex', this.pokemons.name], navigationExtras);
  }
}
