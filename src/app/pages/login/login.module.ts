import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

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
    LoginPageRoutingModule,
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
