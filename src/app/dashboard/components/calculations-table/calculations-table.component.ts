import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../shared/services/auth.service';
import { CalculationsService } from './../../services/calculations.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { MessagesService } from '../../../shared/services/messages.service';

@Component({
  selector: 'app-calculations-table',
  templateUrl: './calculations-table.component.html',
  styleUrls: ['./calculations-table.component.scss']
})
export class CalculationsTableComponent implements OnInit {

  constructor(
    public calculationService: CalculationsService,
    private db: AngularFireDatabase,
    private authService: AuthService,
    private messagesService: MessagesService
  ) {  }

  public removeCalculation(key: string, uid: string = this.authService.currentUser.uid): void {
    this.db.list(`users/${uid}/calculations/`).remove(key)
      .then(() => this.messagesService.createMessage('success', `Розрахунок за ${key} видалено`))
      .catch(error => {
        console.log(error);
        this.messagesService.createMessage('error', 'Виникла помилка, спробуйте пізніше.')
      });
  }

  ngOnInit() { }

}
