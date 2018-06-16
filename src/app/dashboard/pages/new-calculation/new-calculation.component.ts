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
  public internet: boolean = false;
  public phone: boolean = false;
  public services: boolean = false;

  constructor(
    private fb: FormBuilder,
    public countersService: CountersService
  ) {
    this.countersService.getCounters.subscribe((value) => {
      if (value && Object.keys(value).length !== 0) {
        this.counters = value;

        if (this.counters.internet > 0) {
          this.internet = true;
          this.totalAmount += this.counters.internet;
        }

        if (this.counters.phone > 0) {
          this.phone = true;
          this.totalAmount += this.counters.phone;
        }

        if (this.counters.services > 0) {
          this.services = true;
          this.totalAmount += this.counters.services;
        }
      }
    })
  }

  private initMetersForm(): void {
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

  private countAmount(counter: string): number {
    if (this.counters) {
      return this.meters.get(counter).value * this.counters[counter]
    }
  }

  private countTotal(): void {
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

  public countAdditional(checkbox: string): void {
    this[checkbox] ? this.totalAmount += this.counters[checkbox] : this.totalAmount -= this.counters[checkbox];
  }

  ngOnInit() {
    this.initMetersForm();
  }
}
