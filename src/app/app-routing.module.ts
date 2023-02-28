import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'auth',
    loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'listadoPedido',
    loadChildren:() => import('./modules/listado-pedidos/listado-pedidos.module').then(m => m.ListadoPedidosModule)
  },
  {
    path:'socio',
    loadChildren:() => import('./modules/socio/socio.module').then(m => m.SocioModule)
  },
  {
    path:'pedido',
    loadChildren:() => import('./modules/pedido/pedido.module').then(m => m.PedidoModule)
  },
  {
    path:'cargaMasiva',
    loadChildren:() => import('./modules/carga-masiva/carga-masiva.module').then(m => m.CargaMasivaModule)
  },
  {
    path:'liquidacion',
    loadChildren:() => import('./modules/liquidacion/liquidacion.module').then(m => m.LiquidacionModule)
  },
  {
    path:'domiciliar',
    loadChildren:() => import('./modules/domiciliar/domiciliar.module').then(m => m.DomiciliarModule)
  },
  {
    path:'tarifado',
    loadChildren:() => import('./modules/tarifado/tarifado.module').then(m => m.TarifadoModule)
  },
  {
    path:'pedidoCF',
    loadChildren:() => import('./modules/pedidoscf/pedidoscf.module').then(m => m.PedidoscfModule)
  },
  {
    path:'**',
    redirectTo:'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
