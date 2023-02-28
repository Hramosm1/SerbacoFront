import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidoscfComponent } from './pedidoscf.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'pedidoCF',component:PedidoscfComponent},
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoscfRoutingModule { }
