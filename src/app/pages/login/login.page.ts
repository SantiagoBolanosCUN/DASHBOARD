import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(public fire: FirebaseService) {}

  options: AnimationOptions = {
    path: 'assets/loginProfe.json',
  };

  login() {
    this.fire.loginGoogle();
  }

  ngOnInit() {}
}
