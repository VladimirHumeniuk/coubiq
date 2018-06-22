import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class CurrentService {

  public current: User = {
    key: '',
    username: '',
    email: '',
    country: '',
    city: ''
  };

  public user;

  constructor(
    public authService: AuthService,
    private authFb: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.user = this.getUser;

    this.user.subscribe(res => {
      if(res) {
        this.current = res;
      }
    });
  }

  get getUser(): Observable<User> {
    return this.authFb.authState
    .switchMap(user => {
      if (user) {
        return this.db.object<User>(`users/${user.uid}`)
          .snapshotChanges().map(changes => {
            const key = changes.payload.key;
            return {
              key,
              ...changes.payload.val()
            }
          })
      } else {
        return Observable.of(null)
      }
    })
  }
}
