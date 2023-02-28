import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidoRoutingModule } from './pedido-routing.module';
import { PedidoComponent } from './pedido.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    PedidoComponent
  ],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    AutocompleteLibModule,
  ]
})
export class PedidoModule { }
