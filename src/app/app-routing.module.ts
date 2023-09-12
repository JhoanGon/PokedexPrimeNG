import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './module/pages/home/home.component';
import { PokemonListRoutingModule } from './module/pages/pokemon-list/pokemon-list-routing.module';

const routes: Routes = [
  { path: 'home', component:HomeComponent },
  { path: '' , redirectTo: 'home', pathMatch: 'full'},
  { path: '**' , redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), PokemonListRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
