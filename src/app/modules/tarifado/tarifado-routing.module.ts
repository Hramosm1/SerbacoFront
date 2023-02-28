import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TarifadoComponent } from './tarifado.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'tarifado',component:TarifadoComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarifadoRoutingModule { }
