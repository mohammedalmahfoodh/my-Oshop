import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(public afAuth:AuthService) { }
  
  login(){
    this.afAuth.login();
  }
}
