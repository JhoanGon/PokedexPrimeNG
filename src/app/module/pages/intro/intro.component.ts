import { Component } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent {

  urlImg: string[] = [
    "/assets/img/charizard-gx.webp",
    "/assets/img/eevee-gx.webp",
    "/assets/img/pikachu-gx.webp",
    "/assets/img/mewtwo-gx.webp"
  ];
}
