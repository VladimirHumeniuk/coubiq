import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RegistrationService } from "../../shared/services/registration.service";
import { EqualValidator } from '../../shared/directives/validate-equal.directive';
import { registerLocaleData } from '@angular/common';
import { INVALID } from '@angular/forms/src/model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public background: string = '../../../assets/images/bg_sign-in.png';
  public registration: FormGroup;

  private emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  public invalidEmail: string = 'Эмейл не валидный.';
  public passwordNotEqual: string = 'Пароли не совпадают.';
  public noCitySelected: string = 'Выберите город.';

  protected nameMinLength: number = 4;
  protected nameMaxLength: number = 36;
  protected passMinLength: number = 6;
  protected passMaxLength: number = 30;

  public selectedCountry: string = 'Украина';
  public selectedCity: string;

  public citySelected: boolean;

  public countryData = ['Украина'];
  public cityData = {
    Украина: ['Киев', 'Харьков', 'Львов']
  };

  constructor(
    private fb: FormBuilder,
    public regService: RegistrationService
  ) { }

  initForm() {
    this.registration = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(this.nameMinLength),
        Validators.maxLength(this.nameMaxLength)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(this.emailRegex)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(this.passMinLength),
        Validators.maxLength(this.passMaxLength)
      ]],
      passwordConfirm: ['', [
        Validators.required,
        EqualValidator('password')
      ]]
    })
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.registration.controls[controlName];
    const result = control.invalid && control.touched;

    return result;
  }

  minLengthError(inputName: string, minlength: number): string {
    const sufix = minlength < 5 ? "а" : "ов";
    return `Минимальная длина ${inputName}: ${minlength} символ${sufix}.`
  }

  countryChange(value: string): void {
    this.selectedCity = this.cityData[value][0];
  }

  submitForm(form): void {
    for (const i in this.registration.controls) {
      this.registration.controls[i].markAsDirty();
      this.registration.controls[i].updateValueAndValidity();
    }

    if (this.registration.valid) {
      console.log('dsds')
      // this.regService.createUser(form)
    } else {
      if (this.selectedCity == null) {
        this.citySelected = false;
      }
      console.log('fals')
    }
  }

  isCitySelected(select): void {
    if (select == null) {
      this.citySelected = false;
    } else {
      this.citySelected = null;
    }
  }

  ngOnInit() {
    this.initForm();
  }

}
