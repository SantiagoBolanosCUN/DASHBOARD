import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TareasPageRoutingModule } from './tareas-routing.module';
import { LottieModule } from 'ngx-lottie';
import { TareasPage } from './tareas.page';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import player from 'lottie-web';
import { NgxPaginationModule } from 'ngx-pagination';

export function animacionTareas() {
  return player;
}

@NgModule({
  imports: [
    LottieModule.forRoot({ player: animacionTareas }),
    CommonModule,
    FormsModule,
    IonicModule,
    TareasPageRoutingModule,
    NgxPaginationModule,
  ],
  declarations: [TareasPage, NavbarComponent],
})
export class TareasPageModule {}
