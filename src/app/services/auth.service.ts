import { Injectable } from '@angular/core';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import * as firebase from 'firebase'
import { concat, Observable } from "rxjs";
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$:Observable <firebase.User>;
  constructor(private afAuth:AngularFireAuth,private route:ActivatedRoute) {
    this.user$=afAuth.authState;
   }
   
  //### log in for admin with email and password ########
  doRegister(value){
    let returnUrl= this.route.snapshot.queryParamMap.get('returnUrl') ||'/admin-login'
  localStorage.setItem('returnUrl',returnUrl)
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }
  
///##### login for user with google email #######
  login(){
  
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())     
  }
  logout(){
    this.afAuth.auth.signOut();
    
  }
}
