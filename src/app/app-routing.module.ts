import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'tareas',
    loadChildren: () =>
      import('./pages/tareas/tareas.module').then((m) => m.TareasPageModule),
  },
  {
    path: 'create-tareas',
    loadChildren: () =>
      import('./pages/create-tareas/create-tareas.module').then(
        (m) => m.CreateTareasPageModule
      ),
  },
  {
    path: 'login-admin',
    loadChildren: () =>
      import('./pages/login-admin/login-admin.module').then(
        (m) => m.LoginADMINPageModule
      ),
  },
  {
    path: 'admin-layout',
    loadChildren: () =>
      import('./pages/admin-layout/admin-layout.module').then(
        (m) => m.AdminLayoutPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
