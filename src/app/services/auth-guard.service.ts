import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth:AuthService,private router:Router) { }
  canActivate(rout,state:RouterStateSnapshot){
  return this.auth.user$.map(user=>{
  if(user)return true;   
  this.router.navigate(['/admin-login'],{queryParams:{returnUrl:state.url}});
  return false;
  })
  }
}
