import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoPedidosRoutingModule } from './listado-pedidos-routing.module';
import { ListadoPedidosComponent } from './listado-pedidos.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
// import { NgxSpinnerModule } from 'ngx-spinner';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    ListadoPedidosComponent
  ],
  imports: [
    CommonModule,
    ListadoPedidosRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    AutocompleteLibModule,
    // NgxSpinnerModule,
    // BrowserAnimationsModule
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListadoPedidosModule { }
