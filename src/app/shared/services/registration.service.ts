import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { User } from '../interfaces/user';

@Injectable()
export class RegistrationService {

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFireDatabase
  ) { }

}
