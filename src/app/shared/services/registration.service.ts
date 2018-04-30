import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { User } from '../interfaces/user';

@Injectable()
export class RegistrationService {

  protected usersRef: string = 'users';
  protected user: Observable<any[]>;

  constructor(
    private authFb: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) { }


  writeUser(uid: string, user: User) {
    this.db.object(`${this.usersRef}/${uid}`).set({
      username: user.username,
      email: user.email,
      password: user.password,
      country: user.country,
      city: user.city
    })
  };

  createUser(user: User) {
    this.authFb.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then((user$) => {
        this.user = user$;
        user$.sendEmailVerification();

        this.writeUser(user$.uid, user);
      })
      .catch(error => console.log(error))
  };

  onSubmit(form) {
    const controls = form.controls;

    let formData = Object.assign({});
    formData = Object.assign(formData, form.value);

    if (form.valid) {
      const user: User = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        country: formData.country,
        city: formData.city
      }

      this.createUser(user);
    } else {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return
    }
  }

}
