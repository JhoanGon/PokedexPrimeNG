export interface EvolutionChain {
  baby_trigger_item: any;
  chain: EvolutionChainItem;
  id: number;
}

interface EvolutionDetail {

}

interface EvolutionSpecies {
  name: string;
  url: string;
}

interface EvolutionChainItem {
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionChainItem[];
  is_baby: boolean;
  species: EvolutionSpecies;
}
