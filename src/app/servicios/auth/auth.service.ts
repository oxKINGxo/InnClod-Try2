import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  getAuthToken(): Observable<boolean>{
    if(localStorage.getItem('token')){
      return of(true);
    }else{
      this.router.navigate(['login']);
      return of(false);
    }
    
  }
}
