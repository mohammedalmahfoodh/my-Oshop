import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-admin-log-in',
  templateUrl: './admin-log-in.component.html',
  styleUrls: ['./admin-log-in.component.css']
})
export class AdminLogInComponent implements OnInit {
  errorMessage: string;
  successMessage: string;
  //registerForm=new FormControl()
  registerForm=new FormGroup({
    email:new FormControl(),
    password:new FormControl()
  })
  constructor(private authService:AuthService,private afAuth:AngularFireAuth) {
    afAuth.authState.subscribe(status=>console.log(status))
   }

  ngOnInit() {
  }
  tryRegister(value){
    this.authService.doRegister(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "you are logged in";
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }

}
