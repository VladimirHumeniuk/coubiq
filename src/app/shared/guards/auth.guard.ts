import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class isUser implements CanActivate {
  constructor (
    private router: Router,
    private fireAuth: AngularFireAuth
  ) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.fireAuth.authState.map((auth) => {
      if(auth !== null) {
        return true;
      } else {
        this.router.navigate(['/']);
        return true;
      }
    })
  }
}

@Injectable()
export class isGuest implements CanActivate {
  constructor (
    private router: Router,
    private fireAuth: AngularFireAuth
  ) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.fireAuth.authState.map((auth) => {
      if(auth !== null) {
        this.router.navigate(['/dashboard']);
        return false;
      } else {
        return true;
      }
    })
  }
}