import { User } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  public currentUser: firebase.User;
  public user$: Observable<User>;

  // Validation errors
  public invalidEmailMsg: string;
  public invalidPasswordMsg: string;
  public invalidDataMsg: string;

  constructor(
    private authFb: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.authFb.authState.subscribe((auth) => {
      this.currentUser = auth;
    })

    this.user$ = this.authFb.authState
    .switchMap(user => {
      if (user) {
        return this.db.object<User>(`users/${user.uid}`)
        .valueChanges();
      } else {
        return Observable.of(null);
      }
    })
  }

  public auth(form): any {
    const controls = form.controls;

    let formData = Object.assign({});
    formData = Object.assign(formData, form.value);

    return this.authFb
      .auth
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then(user => {
        this.currentUser = user;
        this.router.navigate(['/']);
      })
      .catch(error => {
        switch(error.code) {
          case 'auth/wrong-password':
            this.invalidPasswordMsg = 'Пароль невірний';
            break;

          case 'auth/user-not-found' || 'auth/invalid-email':
            this.invalidEmailMsg = 'Емейл невірний або користувач з такою адресою не існує.'
            break;

          default:
          this.invalidDataMsg = 'Виникла помилка при авторизації. Будь-ласка, перевірте введені дані.';
        }
      })
  }

  get isUserEmailLoggedIn(): boolean {
    if (this.currentUser !== null) {
      return true
    } else {
      return false
    }
  }

  public logout(): void {
    this.authFb.auth.signOut();
    this.router.navigate(['/']);
  }
}
