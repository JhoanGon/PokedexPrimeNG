import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './module/pages/home/home.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { IntroComponent } from './module/pages/intro/intro.component';
import { LoginModule } from './module/pages/login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { PokemonListComponent } from './module/pages/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './module/pages/pokemon-detail/pokemon-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IntroComponent,
    PokemonListComponent,
    PokemonDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    LoginModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
