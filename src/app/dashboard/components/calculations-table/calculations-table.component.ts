import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CalculationsService } from './../../services/calculations.service';

@Component({
  selector: 'app-calculations-table',
  templateUrl: './calculations-table.component.html',
  styleUrls: ['./calculations-table.component.scss']
})
export class CalculationsTableComponent implements OnInit {
  @Output() emitChecked: EventEmitter<any[]> = new EventEmitter();

  public allChecked = false;
  public indeterminate = false;
  public displayData: any = [];
  public checkedArr: any = [];

  constructor(
    public calculationService: CalculationsService
  ) { }

  public checkAll(value: boolean): void {
    this.displayData.forEach(data => data.checked = value);
    this.refreshStatus();
  }

  public currentPageDataChange($event: any): void {
    this.displayData = $event;
  }

  public refreshStatus(): void {
    const allChecked = this.displayData.every(value => value.checked === true);
    const allUnChecked = this.displayData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.checkedArr = this.displayData.filter(value => value.checked);

    this.emitChecked.emit(this.displayData.filter(value => value.checked));
  }

  ngOnInit() {
  }

}
