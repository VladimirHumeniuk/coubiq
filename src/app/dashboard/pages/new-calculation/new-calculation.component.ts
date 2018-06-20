import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountersService } from '../../services/counters.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { CurrentService } from '../../../shared/services/current.service';
import { DatePipe } from '@angular/common';
import { MessagesService } from '../../../shared/services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-calculation',
  templateUrl: './new-calculation.component.html',
  styleUrls: ['./new-calculation.component.scss']
})
export class NewCalculationComponent implements OnInit {
  protected userRef: string = 'users';

  public meters: FormGroup;
  public counters: any;

  public totalAmount: number = 0;

  public inputsValue: number = 0;
  public checkboxValue: number = 0;

  public month: object = new Date();
  public internet: boolean = false;
  public phone: boolean = false;
  public services: boolean = false;

  public _TOTAL: any = [];

  constructor(
    private db: AngularFireDatabase,
    private fb: FormBuilder,
    public currentService: CurrentService,
    public countersService: CountersService,
    private datePipe: DatePipe,
    public messagesService: MessagesService,
    private router: Router
  ) {
    this.countersService.getCounters.subscribe((value) => {
      if (value && Object.keys(value).length !== 0) {
        this.counters = value;

        if (!this.counters.withCounter) {
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
      ]],
      comment:  ['', []],
    })

    this.countInputs();
  }

  protected countInputs(): void {
    this.meters.valueChanges.subscribe(val => {

      let res = [];
      this._TOTAL = [];

      Object.keys(this.meters.controls).forEach(key => {
        if (this.counters.withCounter && key != 'comment') {
          this.countMeters(res, key)

        } else if (key != 'heating' && key != 'comment') {
          this.countMeters(res, key)
        }
      });

      res = res.reduce((prev, next) => prev + next);

      if (!this.counters.withCounter) {
        res = Number(res) + this.meters.get('heating').value;
      }

      this.inputsValue = Number(res);
    })
  }

  protected countMeters(arr: any, key: string) {
    arr.push(this.meters.get(key).value * this.counters[key]);

    this._TOTAL.push({
      [key]: {
        val: this.meters.get(key).value,
        cost: this.meters.get(key).value * this.counters[key]
      }
    });
  }

  protected countAdditional(checkbox: string): void {
    this[checkbox] ? this.checkboxValue += this.counters[checkbox] : this.checkboxValue -= this.counters[checkbox];
  }

  get countTotal(): number {
    return Math.round((this.inputsValue + this.checkboxValue) * 1e2) / 1e2
  }

  saveCalculation(uid: string, month: string) {
    let date = this.datePipe.transform(month, 'MM-yyyy');
    let ref = `${this.userRef}/${uid}/calculations/${date}`;
    let index;

    let other = {
      'date': date,
      'additional': {
        'Інтернет': this.internet,
        'Телефон': this.phone,
        'ЖКП': this.services
      },
      'comment': this.meters.get('comment').value,
      'total': this.countTotal
    }

    this._TOTAL.push(other);

    let promises = [];

    for (index = 0; index < this._TOTAL.length; ++index) {
      let promise = this.db.object(ref).update(this._TOTAL[index]);
      promises.push(promise);
    }

    Promise.all(promises)
      .then(() => {
        this.messagesService.createMessage('success', `Розрахунок за ${date} збережено.`);
        this.router.navigate(['/dashboard/my-calculations']);
      })
      .catch(error => {
        this.messagesService.createMessage('error', "Виникла помилка при збереженні. Спробуйте пізніше.");
      });
  }

  ngOnInit() {
    this.initMetersForm();
  }
}
