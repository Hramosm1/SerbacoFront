import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocioRoutingModule } from './socio-routing.module';
import { SocioComponent } from './socio.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


@NgModule({
  declarations: [
    SocioComponent
  ],
  imports: [
    CommonModule,
    SocioRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    AutocompleteLibModule,
    
  ]
})
export class SocioModule { }
