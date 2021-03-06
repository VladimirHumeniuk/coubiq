import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AngularFireDatabase } from 'angularfire2/database';
import { CurrentService } from '../../../shared/services/current.service';
import { Counters } from '../../../shared/interfaces/counters';
import { CountersService } from '../../services/counters.service';
import { MessagesService } from '../../../shared/services/messages.service';

@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html',
  styleUrls: ['./counters.component.scss']
})

export class CountersComponent implements OnInit {
  protected userRef: string = 'users';
  public counters: FormGroup;

  public saveLoader: boolean = false;

  constructor(
    private db: AngularFireDatabase,
    private fb: FormBuilder,
    public currentService: CurrentService,
    public countersService: CountersService,
    public messagesService: MessagesService
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
      withCounter: [''],
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
      ]]
    })
  }

  public saveCounter(uid: string, form: any): void {
    let formData = Object.assign({});
    formData = Object.assign(formData, form.value);

    const counters: Counters = {
      electricity: formData.electricity,
      gas: formData.gas,
      coldWater: formData.coldWater,
      hotWater: formData.hotWater,
      heating: formData.heating,
      withCounter: formData.withCounter,
      houseroom: formData.houseroom,
      internet: formData.internet,
      phone: formData.phone,
      services: formData.services,
      other: 1
    };

    this.saveLoader = true;

    this.db.object(`${this.userRef}/${uid}/counters`).update(counters)
      .then(() => {
        this.messagesService.createMessage('success', 'Нові дані успішно збережені.');
        this.saveLoader = false;
        form.markAsPristine();
      })
      .catch(error => this.messagesService.createMessage('error', 'Виникла помилка при збереженні. Спробуйте пізніше.'))
  }

  ngOnInit() {
    this.initCountersForm();

    this.countersService.getCounters
    .subscribe((value) => {
      if (value && Object.keys(value).length !== 0) {
        this.counters.setValue({
          'electricity': value.electricity,
          'gas': value.gas,
          'coldWater': value.coldWater,
          'hotWater': value.hotWater,
          'withCounter': value.withCounter,
          'heating': value.heating,
          'houseroom': value.houseroom,
          'internet': value.internet,
          'phone': value.phone,
          'services': value.services
        })
      }
    });
  }
}
