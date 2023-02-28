import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoPedidosComponent } from './listado-pedidos.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'listadoPedido',component:ListadoPedidosComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListadoPedidosRoutingModule { }
