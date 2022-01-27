import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTareasPageRoutingModule } from './create-tareas-routing.module';

import { CreateTareasPage } from './create-tareas.page';

import { RouteReuseStrategy } from '@angular/router';
import { RouterModule } from '@angular/router';

//Modulos
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

import { environment } from 'src/environments/environment';

export function animacionAgregar() {
  return player;
}

@NgModule({
  imports: [
    LottieModule.forRoot({ player: animacionAgregar }),
    CommonModule,
    FormsModule,
    IonicModule,
    CreateTareasPageRoutingModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireModule,
    RouterModule.forChild([
      {
        path: '',
        component: CreateTareasPage,
      },
    ]),
  ],
  declarations: [CreateTareasPage],
})
export class CreateTareasPageModule {}
