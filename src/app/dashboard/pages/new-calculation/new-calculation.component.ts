import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountersService } from '../../services/counters.service';

@Component({
  selector: 'app-new-calculation',
  templateUrl: './new-calculation.component.html',
  styleUrls: ['./new-calculation.component.scss']
})
export class NewCalculationComponent implements OnInit {

  public meters: FormGroup;
  public counters: any;

  public totalAmount: number = 0;

  public month: number = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    public countersService: CountersService
  ) {
    this.countersService.getCounters.subscribe((value) => {
      if (value && Object.keys(value).length !== 0) {
        this.counters = value;
      }
    })
  }

  initMetersForm() {
    this.meters = this.fb.group({
      electricity: ['0', [
        Validators.min(0)
      ]],
      gas: ['0', [
        Validators.min(0)
      ]],
      coldWater: ['0', [
        Validators.min(0)
      ]],
      hotWater: ['0', [
        Validators.min(0)
      ]],
      heating: ['0', [
        Validators.min(0)
      ]],
      houseroom: ['0', [
        Validators.min(0)
      ]],
      other: ['0', [
        Validators.min(0)
      ]]
    })

    this.countTotal();
  }

  countAmount(counter: string) {
    if (this.counters) {
      return this.meters.get(counter).value * this.counters[counter]
    }
  }

  countTotal() {
    this.meters.valueChanges.subscribe(val => {
      this.totalAmount = Number((
        this.countAmount('electricity') +
        this.countAmount('gas') +
        this.countAmount('coldWater') +
        this.countAmount('hotWater') +
        this.countAmount('heating') +
        this.countAmount('houseroom') +
        this.countAmount('other'))
        .toFixed(2)
      )
    })
  }

  ngOnInit() {
    this.initMetersForm()
  }
}
