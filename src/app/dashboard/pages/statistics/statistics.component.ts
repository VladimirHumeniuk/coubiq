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

  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(230, 247, 255, 0.4)',
      borderColor: '#1890ff',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#3f85f5',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ]

  public electricity: Array<ChartData> = [new ChartData([], 'Електроенергія')];
  public coldWater: Array<ChartData> = [new ChartData([], 'Холодне водопостачання та водовідведення')];
  public hotWater: Array<ChartData> = [new ChartData([], 'Гаряче водопостачання')];
  public gas: Array<ChartData> = [new ChartData([], 'Газ')];
  public heating: Array<ChartData> = [new ChartData([], 'Опалення')];
  public total: Array<ChartData> = [new ChartData([], 'Загальні витрати')];

  public activeData: string = 'electricity';
  public graphData = this.electricity;

  public lineChartOptions: any = {
    responsive: true,
    tooltips: {
      enabled: true,
      mode: 'x-axis',
      callbacks: {
          label: (tooltipItems) => {
              return tooltipItems.yLabel + ' грн.';
          }
      }
    }
  };

  public lineChartLegend: boolean = false;
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

          this.electricity[0].data.push(i.value.electricity.cost);
          this.coldWater[0].data.push(i.value.coldWater.cost);
          this.hotWater[0].data.push(i.value.hotWater.cost);
          this.gas[0].data.push(i.value.gas.cost);
          this.heating[0].data.push(i.value.heating.cost);
          this.total[0].data.push(i.value.total);
        });
      }
    })
  }

  public changeData(data: string): void {

    this.graphData = this[data];
  }

  ngOnInit() {
  }

}
