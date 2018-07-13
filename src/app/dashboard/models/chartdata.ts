export class ChartData {
  data: Array<number>;
  label: String;

  constructor(data: Array<number> = [], label: string = '') {
    this.data = data;
    this.label = label;
  }

  chartData() {
    return {
      data: this.data,
      label: this.label
    }
  }
}