import { FirebaseService } from 'src/app/services/firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  btnLogout = false
  constructor(private firebase: FirebaseService) { }

  logout(){
    this.firebase.logout()
  }

  ngOnInit() {
    let infoDocente = JSON.parse(localStorage.getItem('infoDocente'))
    if(infoDocente){
      this.btnLogout = true
    }
  }

}
