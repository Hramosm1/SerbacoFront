import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DomiciliarRoutingModule } from './domiciliar-routing.module';
import { DomiciliarComponent } from './domiciliar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [DomiciliarComponent],
  imports: [
    CommonModule,
    DomiciliarRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    AutocompleteLibModule,
    NgxFileDropModule,
    NgxDropzoneModule,
    NgxQRCodeModule
  ]
})
export class DomiciliarModule { }
