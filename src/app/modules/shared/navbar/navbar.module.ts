import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NavbarComponent} from './navbar.component'
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
