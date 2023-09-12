import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card3d',
  templateUrl: './card3d.component.html',
  styleUrls: ['./card3d.component.scss']
})
export class Card3dComponent {

  @Input() urlImageCard: string;

  rotateCard(event: MouseEvent) {
    const card = event.target as HTMLElement;
    const cardRect = card.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const rotationAmount = (event.clientX - cardCenterX) / cardRect.width * 35;

    card.style.transform = `perspective(1000px) rotateY(${rotationAmount}deg) rotateX(${rotationAmount}deg)`;
  }

  resetCardRotation() {
    const card = document.getElementById('card') as HTMLElement;
    card.style.transform = 'perspective(1000px) rotateY(0)';
  }

}
