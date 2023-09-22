import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card3dComponent } from './components/card3d/card3d.component';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { CardsPokemonsComponent } from './components/cards-pokemons/cards-pokemons.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    Card3dComponent,
    CardsPokemonsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    DialogModule,
    InfiniteScrollModule,
    PaginatorModule,
    TableModule,
    ButtonModule,
    ScrollingModule
    ],
  exports:[
    FormsModule,
    Card3dComponent,
    ToastModule,
    CardsPokemonsComponent,
    InfiniteScrollModule,
    PaginatorModule,
    TableModule,
    ButtonModule,
    ScrollingModule
  ]
})
export class SharedModule { }
