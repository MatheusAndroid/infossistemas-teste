import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVeiculoComponent } from './component/add-veiculo/add-veiculo.component';
import { EditComponent } from './component/edit/edit.component';
import { VeiculosComponent } from './component/veiculos/veiculos.component';

const routes: Routes = [
  {
    path: 'home',
    component: VeiculosComponent,
  },
  {
    path: 'add',
    component: AddVeiculoComponent
  },
  {
    path: 'edit',
    component: EditComponent
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
