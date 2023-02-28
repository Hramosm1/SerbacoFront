import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargaMasivaComponent } from './carga-masiva.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'cargaMasiva',component:CargaMasivaComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargaMasivaRoutingModule { }
