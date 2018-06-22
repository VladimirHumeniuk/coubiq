import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../shared/interfaces/user';
import { CurrentService } from '../../shared/services/current.service';
import { MessagesService } from './../../shared/services/messages.service';
import * as firebase from 'firebase/app';

@Injectable()
export class UpdateUserService {
  private userRef: string = 'users';
  public user: Observable<any[]> = null;

  public wrongPassword: boolean = false;

  constructor(
    private authFb: AngularFireAuth,
    private currentService: CurrentService,
    private db: AngularFireDatabase,
    private messagesService: MessagesService
  ) { }

  public updateUsername(uid: string, username: string): void {
    firebase.auth().currentUser.updateProfile({
      displayName: username,
      photoURL: ''
    }).then(() => {
      this.db.object(`${this.userRef}/${uid}`).update({
        username: username
      })
    })
  }

  public changeLocation(uid: string, country: string, city: string): void {
    this.db.object(`${this.userRef}/${uid}`).update({
      country: country,
      city: city
    })
  }

  public updatePass(password: string, form: any): void {
    const user = this.authFb.auth.currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password);

    let formData = Object.assign({});
    formData = Object.assign(formData, form.value);

    user.reauthenticateWithCredential(credentials)
      .then(() => {
        this.wrongPassword = false;
        this.messagesService.createMessage('success', "Пароль успішно змінений.")

        this.authFb.auth.currentUser.updatePassword(formData.newPassword)
          .then(function() {
            form.reset()
          })
          .catch(error => {
            this.messagesService.createMessage('error', 'Виникла помилка при збереженні. Спробуйте пізніше.')
          });
      })
      .catch(error => {
        this.wrongPassword = true
      })
  }

  public updateUserData(uid: string, user: User): void {
    this.updateUsername(uid, user.username);
    this.changeLocation(uid, user.country, user.city);

    this.messagesService.createMessage('success', "Нові дані успішно збережені.");
  }
}
