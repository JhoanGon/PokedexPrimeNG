export interface EvolutionChain {
  baby_trigger_item: any;
  chain: EvolutionChainItem;
  id: number;
  varieties: MegaEvolution;
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

interface MegaEvolution{
  name: string
  url: string;
}
