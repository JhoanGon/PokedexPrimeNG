import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './components/global/navbar/navbar.component';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    NavbarComponent
  ]
})
export class CoreModule { }
