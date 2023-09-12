import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonDetail } from 'src/app/core/models/class/PokemonDetail';
import { PokemonService } from 'src/app/core/services/pokemon-services/pokemon.service';
import { SearchServiceService } from 'src/app/core/services/searchService/search-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  searchValue: string | undefined;

  constructor(private searchService: SearchServiceService,
    private router: Router) {}

  onSearch() {
    if (this.searchValue) {
      this.searchService.setSearchResults([this.searchValue]);
    } else {
      this.searchService.setSearchResults([]);
    }
  }
  resetSearch() {
    this.searchValue = '';
    this.onSearch();
  }

  introPage(){
    this.router.navigate(['intro']);
  }
}
