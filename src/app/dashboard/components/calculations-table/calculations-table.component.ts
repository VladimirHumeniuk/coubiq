import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CalculationsService } from './../../services/calculations.service';
import arraySort from 'array-sort'

@Component({
  selector: 'app-calculations-table',
  templateUrl: './calculations-table.component.html',
  styleUrls: ['./calculations-table.component.scss']
})
export class CalculationsTableComponent implements OnInit {
  @Output() emitChecked: EventEmitter<any[]> = new EventEmitter();
  @Output() emitTableData: EventEmitter<any[]> = new EventEmitter();

  public allChecked = false;
  public indeterminate = false;
  public dataSet: any = [];
  public displayData: any = [];
  public checkedArr: any = [];

  public calcLoaded: boolean = false;

  constructor(
    public calculationService: CalculationsService
  ) {
    this.dataSet = this.calculationService.getCalculations;

    this.dataSet.subscribe(res => {
      if(res) {
        this.displayData = arraySort(Object.keys(res).map(key => {
          return { key: key, value: res[key] }
        }), 'value.date', {reverse: true});

        this.emitTableData.emit(this.displayData);
        this.calcLoaded = true;
      } else {
        this.calcLoaded = true;
      }
    })
  }

  public checkAll(value: boolean): void {
    this.dataSet.forEach(data => data.checked = value);
    this.refreshStatus();
  }

  public currentPageDataChange($event: any): void {
    this.dataSet = $event;
  }

  public refreshStatus(): void {
    const allChecked = this.dataSet.every(value => value.checked === true);
    const allUnChecked = this.dataSet.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.checkedArr = this.displayData.filter(value => value.checked);

    this.emitChecked.emit(this.displayData.filter(value => value.checked));
  }

  ngOnInit() {
  }

}
