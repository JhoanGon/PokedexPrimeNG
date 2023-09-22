import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, catchError, throwError } from 'rxjs';
import { PokemonService } from 'src/app/core/services/pokemon-services/pokemon.service';
import { SearchServiceService } from 'src/app/core/services/searchService/search-service.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  private evolutionSubscription: Subscription | undefined;
  pokemonId: any = "";
  pokemons: any = " ";
  switchShiny: boolean = false;
  switch3D: boolean = false;
  switchMega: boolean = false;
  switchGigant: boolean = false;
  idChain: number = 0;
  evolutionPokemonData: any = "";
  evolutionPokemon: any = "";
  sizeEvolution: string = "";
  statsPokemons: any[] = [];
  data: any;
  idStatPokemon: number = 0;
  maxStat: number;
  selectedElement: string = 'Base';
  index: number = 0;
  megaEv: any[] = [];
  idMega: number;
  idGigant: number;
  abilities: any [] = [];
  forms: any[] = [];
  typePoke: any[] = [];
  pokeState: string = "Base";

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router,
    private searchService: SearchServiceService
  ){
    this.idStatPokemon = 0;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.pokemonId = params['pokemon'];
    });
    this.getPokemon(this.pokemonId);
    this.getChainEvolution();
    this.almacenarResultado();
  }

  selectElement(element: string): void {
    this.selectedElement = element;
  }

  splitByNewline(input: string): string[] {
    return input.split('\n');
  }

  calculateStatMax(): number {
    const iv = 31;
    const ev = 252;
    const level = 100;
    const rawStat = Math.floor(((iv + ev / 4) * level) / 100 + 5);
    return rawStat;
  }

  calculateStatMin(): number {
    const iv = 0;
    const ev = 0;
    const level = 100;
    const rawStat = Math.floor(((iv + ev / 4) * level) / 100 + 5);
    return rawStat;
  }

  getPokemon(pokemon: number | string){
    this.pokemonService.getPokemonDetail(pokemon).subscribe(data =>{
      this.pokemons = data;
      this.getStats(this.pokemons);
      this.abilities = this.getAbilities(this.pokemons);
      this.typePoke = this.getType(this.pokemons);
      this.getForms();
    });
  }

  getAbilities(pokemons: any): any[] {
    let i = 0;
    let abilities: any[] = [];
    while(i < pokemons.types.length){
      abilities.push(" " + pokemons.abilities[i].ability.name + " ");
      i ++;
    }
    return abilities;
  }

  getType(pokemons: any): any{
    let type: any[] = [];
    let i = 0;
    while(i < pokemons.types.length){
      type.push(pokemons.types[i].type.name);
      i++;
    }
    return type;
  }

  getForms(){
    let forms: any[] = [];
    this.pokemonService.getPokemonSpeciesDetail(this.pokemonId).subscribe((mega) => {
      const megaE = mega.varieties;
      let nameForm: any;
      let index = 0;
      while (index < megaE.length) {
        nameForm = megaE[index].pokemon.name.replace("-"," ");
        if(nameForm.includes("mega")){
          nameForm = nameForm.replace('mega','')
          nameForm = 'mega ' + nameForm
          forms.push(" " + nameForm + " ");
        }else if(nameForm.includes('gmax')){
          nameForm = nameForm.replace('gmax','')
          nameForm = 'gigantamax ' + nameForm
          forms.push(" " + nameForm + " ");
        }else{
          forms.push(" " + nameForm + " ");
        }
        index++;
      }
      this.forms = forms.map((elemento) => elemento.replace(/,\s*/g, ' '));
    })
  }

  async almacenarResultado() {
    try {
      this.idMega = await this.obtenerIdMega();
      this.idGigant = await this.obtenerIdGigant();
      if (this.idMega == null) {
        console.log('No se encontró una forma Mega.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  getPokemonImageURL(pokemon: any): string {
    let urlBase = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/`;
    let endUrlBase = `.png?raw=true`;
    let url = "";
    let id = 0;

    switch(this.pokeState){
      case "Base":
        id = pokemon
        break;

      case "Mega":
        id = this.idMega
        this.switchGigant = false;
        break;

      case "Gigant":
        id = this.idGigant
        this.switchMega = false;
        break;
    }

    if(this.switchShiny && !this.switch3D){
      url = urlBase + "official-artwork/shiny/" + id + endUrlBase;
    }else if(!this.switchShiny && this.switch3D){
      url = urlBase + "home/" + id + endUrlBase;
    }else if(this.switchShiny && this.switch3D){
      url = urlBase + "home/shiny/" + id + endUrlBase;
    }else{
      url = urlBase + "official-artwork/" + id + endUrlBase;
    }
    return url;
  }

  async getMegaAndGigant(formName: string): Promise<string> {
    let megaE: any;
    let index = 0;
    this.megaEv = [];
    return new Promise<string>((resolve, reject) => {
      this.pokemonService.getPokemonSpeciesDetail(this.pokemonId).subscribe({
        next: (data) => {
          megaE = data.varieties;
          while (index < megaE.length) {
            this.megaEv.push({
              name: megaE[index].pokemon.name,
              url: megaE[index].pokemon.url
            });
            if (this.megaEv[index].name.includes(formName)) {
              resolve(JSON.stringify(this.megaEv[index].url));
              return;
            }
            index++;
          }

          reject(new Error('No se encontró la forma ' + formName));
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }

  async obtenerIdMega(): Promise<number> {
    try {
      let urlForm = await this.getMegaAndGigant('mega');
      if (urlForm) {
        const idMega = parseInt(urlForm.split('/')[6]);
        return idMega;
      } else {
        throw new Error('No se encontró una forma Mega.');
      }
    } catch {
      throw new Error('No se encontró una forma Mega.');
    }
  }

  async obtenerIdGigant(): Promise<number> {
    try {
      let urlForm = await this.getMegaAndGigant('gmax');
      if (urlForm) {
        const idGigant = parseInt(urlForm.split('/')[6]);
        return idGigant;
      } else {
        throw new Error('No se encontró una forma Gigant.');
      }
    } catch {
      throw new Error('No se encontró una forma Gigant.');
    }
  }

  toggleShiny() {
    this.switchShiny = !this.switchShiny;
  }

  toggle3D() {
    this.switch3D = !this.switch3D;
  }

  toggleMega() {
    this.switchMega = !this.switchMega;
    this.pokeState = this.pokeState === "Mega" ? 'Base' : 'Mega';
  }

  toggleGigant() {
    this.switchGigant = !this.switchGigant;
    this.pokeState = this.pokeState === "Gigant" ? 'Base' : 'Gigant';
  }

  handleImageError(event: any) {
    event.target.src = '';
  }
  getPrincipalBorderClass(list: any[]) {
    let primaryType:any;
    if(list){
      primaryType = list.filter((x) => x.slot === 1 )[0]?.type.name;
    }
    return primaryType;
  }

  getStats(pokeData: any){
    for(const id in pokeData.stats){
      this.statsPokemons.push({
        name: pokeData.stats[id].stat.name,
        stat: pokeData.stats[id].base_stat
      })
    }
    this.maxStat = Math.max(...this.statsPokemons.map(pokemon => pokemon.stat));
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
