import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginADMINPage } from './login-admin.page';

const routes: Routes = [
  {
    path: '',
    component: LoginADMINPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginADMINPageRoutingModule {}
