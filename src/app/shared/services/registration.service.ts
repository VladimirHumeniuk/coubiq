import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

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
    firebase.auth().currentUser.updateProfile({
      displayName: user.username,
      photoURL: ''
    }).then((() => {
      this.db.object(`${this.usersRef}/${uid}`).set({
        key: uid,
        username: user.username,
        email: user.email,
        country: user.country,
        city: user.city
      })
    }))
  };

  createUser(user: User, password: string) {
    this.authFb.auth.createUserWithEmailAndPassword(user.email, password)
      .then((user$) => {
        this.user = user$;

        user$.sendEmailVerification();
        this.writeUser(user$.uid, user);
        this.router.navigate(['/']);
      })
      .catch(error => console.log(error))
  };

  onSubmit(form, country, city) {
    const controls = form.controls;

    let formData = Object.assign({});
    formData = Object.assign(formData, form.value);

    const user: User = {
      username: formData.username,
      email: formData.email,
      country: country,
      city: city
    }

    this.createUser(user, formData.password);
  }
}
