import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class UpdateUserService {
  protected userRef: string = 'users';
  protected user: Observable<any[]>;

  constructor(
    private authFb: AngularFireAuth,
    private db: AngularFireDatabase
  ) { }

  updateUsername(uid: string, username: string): void {
    firebase.auth().currentUser.updateProfile({
      displayName: username,
      photoURL: ''
    }).then(() => {
      this.db.object(`${this.userRef}/${uid}`).update({
        username: username
      })
    })
  }

  changeEmail(uid: string, oldEmail: string, password: string, newEmail: string): void {
    firebase.auth().signInWithEmailAndPassword(oldEmail, password)
    .then((user) => {
      user.updateEmail(newEmail);
      user.sendEmailVerification();

      this.db.object(`${this.userRef}/${uid}`).update({
        email: newEmail
      })
    })
  }

  changeLocation(uid: string, country: string, city: string) {
    this.db.object(`${this.userRef}/${uid}`).update({
      country: country,
      city: city
    })
  }

  updateUserData(username: string, coutnry: string, city: string, email: string) {

  }

}
