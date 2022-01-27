import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.page.html',
  styleUrls: ['./login-admin.page.scss'],
})
export class LoginADMINPage implements OnInit {
  constructor(public fire: FirebaseService) {}

  options: AnimationOptions = {
    path: 'assets/loginAdmin.json',
  };

  login() {
    this.fire.loginGoogleAdmin();
  }

  ngOnInit() {}
}
