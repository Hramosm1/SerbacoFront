import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargaMasivaRoutingModule } from './carga-masiva-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CargaMasivaComponent } from './carga-masiva.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    CargaMasivaComponent
  ],
  imports: [
    CommonModule,
    CargaMasivaRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    AutocompleteLibModule,
    NgxFileDropModule,
    NgxDropzoneModule,
  ]
})
export class CargaMasivaModule { }
