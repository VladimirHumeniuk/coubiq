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

  public inputsValue: number = 0;
  public checkboxValue: number = 0;

  public month: object = new Date();
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

        if (!this.counters.withCounters) {
          this.meters.controls['heating'].patchValue(this.counters.houseroom * this.counters.heating)
        }

        if (this.counters.internet > 0) {
          this.internet = true;
          this.checkboxValue += this.counters.internet;
        }

        if (this.counters.phone > 0) {
          this.phone = true;
          this.checkboxValue += this.counters.phone;
        }

        if (this.counters.services > 0) {
          this.services = true;
          this.checkboxValue += this.counters.services;
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

    this.countInputs();
  }

  protected countValue(counter: string): number {
    if (this.counters) {
      return this.meters.get(counter).value * this.counters[counter]
    }
  }

  protected countInputs(): void {
    this.meters.valueChanges.subscribe(val => {

      let res = [];

      Object.keys(this.meters.controls).forEach(key => {
        if (this.counters.withCounter) {
          res.push(this.meters.get(key).value * this.counters[key])
        } else {
          if (key != 'heating') {
            res.push(this.meters.get(key).value * this.counters[key])
          }
        }
      });

      res = res.reduce((prev, next) => prev + next);

      this.inputsValue = Number(res);

      if (this.meters.get('other').value > 0) {
        this.inputsValue += this.meters.get('other').value;
      }
    })
  }

  protected countAdditional(checkbox: string): void {
    this[checkbox] ? this.checkboxValue += this.counters[checkbox] : this.checkboxValue -= this.counters[checkbox];
  }

  get countTotal(): number {
    return Math.round((this.inputsValue + this.checkboxValue) * 1e2) / 1e2
  }

  ngOnInit() {
    this.initMetersForm();
  }
}
