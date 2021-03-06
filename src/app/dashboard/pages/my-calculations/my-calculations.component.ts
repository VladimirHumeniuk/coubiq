import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { MessagesService } from '../../../shared/services/messages.service';
import { ExportService } from '../../services/export.service';
import { TableRow } from '../../models/tablerow';

@Component({
  selector: 'app-my-calculations',
  templateUrl: './my-calculations.component.html',
  styleUrls: ['./my-calculations.component.scss']
})
export class MyCalculationsComponent implements OnInit {
  public checkedRows: any[] = [];
  public tableData: any[] = [];

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private messagesService: MessagesService,
    public exportService: ExportService
  ) { }

  public checkedRowsHandler(checkedRows: any[]): void {
    this.checkedRows = checkedRows;
  }

  public tableDataHandler(tableData: any[]): void {
    this.tableData = tableData;
  }

  public removeCalculation(rows: any, uid: string = this.authService.currentUser.uid): void {
    let promises = [];

    for (let i in Object.keys(rows)) {
      let promise = this.db.list(`users/${uid}/calculations/`).remove(rows[i].key);

      promises.push(promise);
    }

    Promise.all(promises)
      .then(() => {
        this.checkedRows = [];
        this.messagesService.createMessage('success', `Розрахун${rows.length > 1 ? 'ки' : 'ок'} видалено.`)
      })
      .catch(error => {
        this.messagesService.createMessage('error', 'Виникла помилка, спробуйте пізніше.')
      });
  }

  public exportFile(data: TableRow[], type: string) {
    let tableRow: TableRow[] = [];

    function arrayFill($data) {
      for (let i in $data) {
        tableRow.push({
            'Місяць': $data[i].key,
            'Електроенергія': $data[i].value.electricity.cost,
            'Газ': $data[i].value.gas.cost,
            'Холодне водопостачання та водовідведення': $data[i].value.coldWater.cost,
            'Гаряче водопостачання': $data[i].value.hotWater.cost,
            'Телефон; Інтернет; ЖКП': $data[i].value.additional,
            'Інше': $data[i].value.other.cost,
            'УСЬОГО': $data[i].value.total
          })
      }
    }

    if (data.length > 0) {
      arrayFill(data)
    } else {
      arrayFill(this.tableData)
    }

    switch (type) {
      case 'xls':
        this.exportService.exportAsExcelFile(tableRow);
        break;

      case 'csv':
        this.exportService.exportAsCsvFile(tableRow);
        break;

      default:
        this.exportService.exportAsExcelFile(tableRow);
    }
  }

  public printTable(): void {
    window.print();
  }

  ngOnInit() {
  }

}
