import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginADMINPageRoutingModule } from './login-admin-routing.module';

import { LoginADMINPage } from './login-admin.page';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function animacionLogin() {
  return player;
}

@NgModule({
  imports: [
    LottieModule.forRoot({ player: animacionLogin }),
    CommonModule,
    FormsModule,
    IonicModule,
    LoginADMINPageRoutingModule,
  ],
  declarations: [LoginADMINPage],
})
export class LoginADMINPageModule {}
