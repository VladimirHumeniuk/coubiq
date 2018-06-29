import { Injectable } from '@angular/core';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  public exportAsExcelFile(json: any[]): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer);
  }

  private saveAsExcelFile(buffer: any): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, 'coubiq_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  public exportAsCsvFile(json: any[]): void {
    new Angular2Csv(json, 'coubiq_' + new Date().getTime(), {
      headers: Object.keys(json[0])
    })
  }
}
