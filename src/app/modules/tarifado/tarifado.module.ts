import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarifadoRoutingModule } from './tarifado-routing.module';
import { TarifadoComponent } from './tarifado.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [TarifadoComponent],
  imports: [
    CommonModule,
    TarifadoRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    AutocompleteLibModule,
  ]
})
export class TarifadoModule { }
