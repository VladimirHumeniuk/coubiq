import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountersService } from '../../services/counters.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { CurrentService } from '../../../shared/services/current.service';
import { DatePipe } from '@angular/common';
import { MessagesService } from '../../../shared/services/messages.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd';
import * as firebase from 'firebase/app';

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

  public saveLoader: boolean = false;

  public _TOTAL: any = [];

  constructor(
    private db: AngularFireDatabase,
    private fb: FormBuilder,
    public currentService: CurrentService,
    public countersService: CountersService,
    private datePipe: DatePipe,
    public messagesService: MessagesService,
    private router: Router,
    private _location: Location,
    private modal: NzModalService
  ) {
    this.countersService.getCounters.subscribe(value => {
      if (value && Object.keys(value).length !== 0) {
        this.counters = value;

        if (!this.counters.withCounter) {
          this.meters.controls['heating'].patchValue(this.counters.houseroom * this.counters.heating)
        }

        const fields = ['internet', 'phone', 'services'];
        fields.forEach(this.checkCounter);

        let res = [];

        Object.keys(this.meters.controls).forEach(key => {
          if (this.counters.withCounter && key != 'comment') {
            this.countMeters(res, key)
          } else if (key != 'heating' && key != 'comment') {
            this.countMeters(res, key)
          }
        });
      }
    })
  }

  private checkCounter = (property: string): void => {
    if (this.counters[property] > 0) {
      this[property] = true;
      this.checkboxValue += this.counters[property];
    }
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
      other: ['0', [
        Validators.min(0)
      ]],
      comment:  ['', []],
    })

    this.countInputs();
  }

  private countInputs(): void {
    this.meters.valueChanges.subscribe(val => {

      let res = [];

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

  private countMeters(arr: any, key: string): void {
    arr.push(this.meters.get(key).value * this.counters[key]);

    this._TOTAL.push({
      [key]: {
        val: this.meters.get(key).value,
        cost: Math.round((this.meters.get(key).value * this.counters[key]) * 1e2) / 1e2
      }
    });
  }

  public countAdditional(checkbox: string): void {
    this[checkbox] ? this.checkboxValue += this.counters[checkbox] : this.checkboxValue -= this.counters[checkbox];
  }

  get countTotal(): number {
    return Math.round((this.inputsValue + this.checkboxValue) * 1e2) / 1e2
  }

  public saveCalculation(uid: string, month: object): void {
    let date = this.datePipe.transform(month, 'MM-yyyy');
    let ref = `${this.userRef}/${uid}/calculations/`;
    let other = {
      'date': month,
      'additional': this.checkboxValue,
      'comment': this.meters.get('comment').value,
      'total': this.countTotal
    }

    this._TOTAL.push(other);

    firebase.database().ref(ref).child(date).once('value', snapshot => {
      if (snapshot.exists()) {
        console.log('Value already exist')
        this.modal.confirm({
          nzTitle: `Розрахунок за ${date} вже існує.`,
          nzContent: 'Перезаписати дані?',
          nzOkText: 'Так',
          nzCancelText: 'Ні',
          nzOnOk: () => this.updateCalculation(ref, date)
        })
      } else {
        this.updateCalculation(ref, date)
      }
    })
  }

  private updateCalculation(ref: string, date: string): void {
    let index;
    let promises = [];

    this.saveLoader = true;

    for (index = 0; index < this._TOTAL.length; ++index) {
      let promise = this.db.object(`${ref}${date}`).update(this._TOTAL[index]);
      promises.push(promise);
    }

    Promise.all(promises)
      .then(() => {
        this.messagesService.createMessage('success', `Розрахунок за ${date} збережено.`);
        this.router.navigate(['/dashboard/my-calculations']);

        this.saveLoader = false;
      })
      .catch(error => {
        this.messagesService.createMessage('error', "Виникла помилка при збереженні. Спробуйте пізніше.");
      });
  }

  public backClicked(): void {
    this._location.back();
  }

  ngOnInit() {
    this.initMetersForm();
  }

}
