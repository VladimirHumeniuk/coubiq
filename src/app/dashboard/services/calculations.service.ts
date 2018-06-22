import { Injectable } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { User } from '../../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  public calculations = [];

  public currentCalctulations = null;
  public calcLoaded: boolean = false;

  constructor(
    public authService: AuthService,
    private authFb: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.currentCalctulations = this.getCalculations;

    this.currentCalctulations.subscribe(res => {
      if(res) {
        this.calculations = Object.keys(res).map(key => {
          return { key: key, value: res[key] }
        });

        this.calcLoaded = true;
      } else {
        this.calcLoaded = true;
      }
    })
  }

  get getCalculations(): Observable<any[]> {
    return this.authFb.authState
      .switchMap(user => {
        if (user) {
          return this.db.object<User>(`users/${user.uid}/calculations`)
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
