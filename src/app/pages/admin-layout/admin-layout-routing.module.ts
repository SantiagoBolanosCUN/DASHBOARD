import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutPage } from './admin-layout.page';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminLayoutPageRoutingModule {}
