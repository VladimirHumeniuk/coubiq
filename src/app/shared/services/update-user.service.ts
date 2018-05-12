import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { User } from '../interfaces/user';
import { CurrentService } from './current.service';

@Injectable()
export class UpdateUserService {
  protected userRef: string = 'users';
  protected user: Observable<any[]>;

  constructor(
    private authFb: AngularFireAuth,
    private currentService: CurrentService,
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

      this.db.object(`${this.userRef}/${uid}`).update({
        email: newEmail
      }).then(() => user.sendEmailVerification())
    })
  }

  changeLocation(uid: string, country: string, city: string) {
    this.db.object(`${this.userRef}/${uid}`).update({
      country: country,
      city: city
    })
  }

  updateUserData(uid: string, user: User, oldEmail: string) {
    console.log(uid, user, oldEmail, this.currentService.current.password)

    this.updateUsername(uid, user.username);
    this.changeLocation(uid, user.country, user.city);

    if (user.email !== oldEmail) {
      this.changeEmail(uid, oldEmail, this.currentService.current.password, user.email)
    }
  }
}
