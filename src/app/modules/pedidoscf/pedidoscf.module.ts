import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidoscfRoutingModule } from './pedidoscf-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { PedidoscfComponent } from './pedidoscf.component';

@NgModule({
  declarations: [
    PedidoscfComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    AutocompleteLibModule,
    CommonModule,
    PedidoscfRoutingModule
  ]
})
export class PedidoscfModule { }
