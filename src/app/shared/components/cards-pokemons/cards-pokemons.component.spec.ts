import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsPokemonsComponent } from './cards-pokemons.component';

describe('CardsPokemonsComponent', () => {
  let component: CardsPokemonsComponent;
  let fixture: ComponentFixture<CardsPokemonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardsPokemonsComponent]
    });
    fixture = TestBed.createComponent(CardsPokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
