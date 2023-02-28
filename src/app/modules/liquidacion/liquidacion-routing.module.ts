import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiquidacionComponent } from './liquidacion.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'liquidacion',component:LiquidacionComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiquidacionRoutingModule { }
