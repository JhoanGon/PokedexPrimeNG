export interface PokemonSpecies {
  evolution_chain: {
    url: string;
  };
  varieties: Array<{
    pokemon:{
      name: string;
      url: string;
    }
  }>;
}
