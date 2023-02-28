import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DomiciliarComponent } from './domiciliar.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'domiciliar',component:DomiciliarComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomiciliarRoutingModule { }
