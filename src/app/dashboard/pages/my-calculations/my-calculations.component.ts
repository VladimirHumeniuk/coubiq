import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { MessagesService } from '../../../shared/services/messages.service';
import { ExportService } from '../../services/export.service';

export class TableRow {
  'Місяць': String;
  'Електроенергія': number;
  'Газ': number;
  'Холодне водопостачання та водовідведення': number;
  'Гаряче водопостачання': number;
  'Телефон, інтернет, ЖКП': number;
  'Інше': number;
  'УСЬОГО': number;
}

@Component({
  selector: 'app-my-calculations',
  templateUrl: './my-calculations.component.html',
  styleUrls: ['./my-calculations.component.scss']
})
export class MyCalculationsComponent implements OnInit {
  public checkedRows: any[] = [];

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private messagesService: MessagesService,
    public exportService: ExportService
  ) { }

  checkedRowsHandler(checkedRows: any[]) {
    this.checkedRows = checkedRows;
  }

  public removeCalculation(rows: any, uid: string = this.authService.currentUser.uid): void {
    let promises = [];

    for (let i in Object.keys(rows)) {
      let promise = this.db.list(`users/${uid}/calculations/`).remove(rows[i].key);

      promises.push(promise);
    }

    Promise.all(promises)
      .then(() => this.messagesService.createMessage('success', `Розрахун${rows.length > 1 ? 'ки' : 'ок'} видалено.`))
      .catch(error => {
        this.messagesService.createMessage('error', 'Виникла помилка, спробуйте пізніше.')
      });
  }

  public exportFile(data: any[], type: string) {
    const TABLEROW: TableRow[] = [];

    for (let i in data) {
      TABLEROW.push(
        {
          'Місяць': data[i].key,
          'Електроенергія': data[i].value.electricity.cost,
          'Газ': data[i].value.gas.cost,
          'Холодне водопостачання та водовідведення': data[i].value.coldWater.cost,
          'Гаряче водопостачання': data[i].value.hotWater.cost,
          'Телефон, інтернет, ЖКП': data[i].value.additional,
          'Інше': data[i].value.other.cost,
          'УСЬОГО': data[i].value.total
        }
      )
    }

    switch (type) {
      case 'xls':
        this.exportService.exportAsExcelFile(TABLEROW);
        break;

      case 'csv':
        this.exportService.exportAsCsvFile(TABLEROW);
        break;

      default:
        this.exportService.exportAsExcelFile(TABLEROW);
    }
  }

  ngOnInit() {
  }

}
