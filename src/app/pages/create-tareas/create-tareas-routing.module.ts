import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateTareasPage } from './create-tareas.page';

const routes: Routes = [
  {
    path: '',
    component: CreateTareasPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, FormsModule, ReactiveFormsModule],
})
export class CreateTareasPageRoutingModule {}
