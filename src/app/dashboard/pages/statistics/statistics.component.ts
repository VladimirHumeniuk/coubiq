import { CalculationsService } from './../../services/calculations.service';
import { Component, OnInit } from '@angular/core';
import arraySort from 'array-sort';
import { ChartData } from '../../models/chartdata';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  public dataSet: any = [];
  public chartData: any = [];

  public monthes: Array<any> = [];

  public electricity: Array<ChartData> = [new ChartData([], 'Електроенергія')];
  public coldWater: Array<ChartData> = [new ChartData([], 'Холодне водопостачання та водовідведення')];
  public hotWater: Array<ChartData> = [new ChartData([], 'Гаряче водопостачання')];
  public gas: Array<ChartData> = [new ChartData([], 'Газ')];
  public heating: Array<ChartData> = [new ChartData([], 'Опалення')];
  public total: Array<ChartData> = [new ChartData([], 'Загальні витрати')];

  public lineChartOptions: any = {
    responsive: true
  };

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  constructor(
    private calculationService: CalculationsService
  ) {
    this.dataSet = this.calculationService.getCalculations;

    this.dataSet.subscribe(res => {
      if(res) {
        this.chartData = arraySort(Object.keys(res).map(key => {
          return { key: key, value: res[key] }
        }), 'value.date');

        this.chartData.forEach(i => {
          this.monthes.push(i.key);
        });

        this.chartData.forEach(i => {
          this.electricity[0].data.push(i.value.electricity.cost)
        });
      }
    })
  }

  ngOnInit() {
  }

}
