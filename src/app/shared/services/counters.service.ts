import { User } from './../interfaces/user';
import { Counters } from './../interfaces/counters';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

@Injectable({
  providedIn: 'root'
})
export class CountersService {

  public counters = null;

  public currentCounters;

  constructor(
    public authService: AuthService,
    private authFb: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.currentCounters = this.getCounters;

    this.currentCounters.subscribe(res => {
      if(res) {
        this.counters = res;
      }
    });
  }

  get getCounters(): Observable<Counters> {
    return this.authFb.authState
    .switchMap(user => {
      if (user) {
        return this.db.object<User>(`users/${user.uid}/counters`)
          .snapshotChanges().map(changes => {
            return {
              ...changes.payload.val()
            }
          })
      } else {
        return Observable.of(null)
      }
    })
  }
}
