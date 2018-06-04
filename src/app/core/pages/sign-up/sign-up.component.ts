import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from "../../services/registration.service";
import { EqualValidator } from '../../../shared/directives/validate-equal.directive';
import { Countries } from '../../../shared/enums/countries.enum';
import { CitiesUa } from '../../../shared/enums/cities-ua.enum';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public background: string = '../../../assets/images/bg_sign-in.png';
  public registration: FormGroup;

  private emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  public invalidEmail: string = 'Емейл не дійсний.';
  public passwordNotEqual: string = 'Паролі не співпадають.';
  public noCitySelected: string = 'Оберіть місто.';

  protected nameMinLength: number = 4;
  protected nameMaxLength: number = 36;
  protected passMinLength: number = 6;
  protected passMaxLength: number = 30;

  public selectedCountry: string = Countries.Ukraine;
  public selectedCity: string;

  public citySelected: boolean;

  public countryData = Object.values(Countries);
  public cityData = {
    Україна: Object.values(CitiesUa)
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

  minLengthError(inputName: string, minlength: number, maxlength: number): string {
    const sufix = minlength < 5 ? "и" : "ів";
    return `Мінімальна довжина ${inputName}: ${minlength} символ${sufix}. Максимальна: ${maxlength}.`
  }

  countryChange(value: string): void {
    this.selectedCity = this.cityData[value][0];
  }

  submitForm(form, country, city): void {
    for (const i in this.registration.controls) {
      this.registration.controls[i].markAsDirty();
      this.registration.controls[i].updateValueAndValidity();
    }

    if (!this.selectedCity) {
      this.citySelected = false;
    }

    if (this.registration.valid && this.selectedCity) {
      this.regService.onSubmit(form, country, city);
    }
  }

  isCitySelected(select): void {
    if (select == null) {
      this.citySelected = false;
    } else {
      this.citySelected = true;
    }
  }

  ngOnInit() {
    this.initForm();
  }

}
