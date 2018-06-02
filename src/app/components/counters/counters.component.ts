import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { CurrentService } from '../../shared/services/current.service';
import { Counters } from '../../shared/interfaces/counters';

@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html',
  styleUrls: ['./counters.component.scss']
})
export class CountersComponent implements OnInit {
  protected userRef: string = 'users';
  public counters: FormGroup;

  public withCounter: boolean = true;

  constructor(
    private db: AngularFireDatabase,
    private fb: FormBuilder,
    public currentService: CurrentService
  ) { }

  initCountersForm() {
    this.counters = this.fb.group({
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
      internet: ['0', [
        Validators.min(0)
      ]],
      phone: ['0', [
        Validators.min(0)
      ]],
      services: ['0', [
        Validators.min(0)
      ]],
      other: ['0', [
        Validators.min(0)
      ]]
    })
  }

  saveCounter(uid: string, form: any) {
    const controls = form.controls;

    let formData = Object.assign({});
    formData = Object.assign(formData, form.value);

    const counters: Counters = {
      electricity: formData.electricity,
      gas: formData.gas,
      coldWater: formData.coldWater,
      hotWater: formData.hotWater,
      heating: formData.heating,
      houseroom: formData.houseroom,
      phone: formData.phone,
      services: formData.services,
      other: formData.other
    };

    this.db.object(`${this.userRef}/${uid}/counters`).update(counters);
  }

  ngOnInit() {
    this.initCountersForm();
  }
}
