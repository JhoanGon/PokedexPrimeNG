import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';

const routes: Routes = [
  { path: 'pokedex', component: PokemonListComponent },
  { path: 'pokedex/:name', component: PokemonDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonListRoutingModule { }
