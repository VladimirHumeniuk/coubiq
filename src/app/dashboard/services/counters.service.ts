import { User } from '../../shared/interfaces/user';
import { Counters } from '../../shared/interfaces/counters';
import { Injectable } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

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
    })
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
