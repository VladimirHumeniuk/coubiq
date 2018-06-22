import { CitiesUa } from '../../../shared/enums/cities-ua.enum';
import { Countries } from '../../../shared/enums/countries.enum';
import { CurrentService } from '../../../shared/services/current.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UpdateUserService } from '../../services/update-user.service';
import { User } from '../../../shared/interfaces/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EqualValidator } from '../../../shared/directives/validate-equal.directive';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public nameMinLength: number = 4;
  public nameMaxLength: number = 36;
  private passMinLength: number = 6;
  private passMaxLength: number = 30;

  public passwordNotEqual: string = 'Паролі не співпадають.';
  public noCitySelected: string = 'Оберіть місто.';

  public selectedCountry: string = Countries.Ukraine;

  public countryData = Object.values(Countries);
  public cityData = {
    Україна: Object.values(CitiesUa)
  };

  public newPassForm: FormGroup;
  public password: string;

  public current;

  constructor(
    private fb: FormBuilder,
    public db: AngularFireDatabase,
    public currentService: CurrentService,
    public updateUser: UpdateUserService
  ) { }

  private initPassForm(): void {
    this.newPassForm = this.fb.group({
      newPassword: ['', [
        Validators.required,
        Validators.minLength(this.passMinLength),
        Validators.maxLength(this.passMaxLength)
      ]],
      passwordConfirm: ['', [
        Validators.required,
        EqualValidator('newPassword')
      ]]
    })
  }

  public updateUserData(
    uid: string,
    username: string,
    country: string,
    city: string
  ): void {

    const user: User = {
      username: username,
      country: country,
      city: city
    };

    this.updateUser.updateUserData(uid, user)
  }

  public isControlInvalid(controlName: string): boolean {
    const control = this.newPassForm.controls[controlName];
    const result = control.invalid && control.touched;

    return result;
  }

  public minLengthError(inputName: string, minlength: number, maxlength: number): string {
    const sufix = minlength < 5 ? "и" : "ів";
    return `Мінімальна довжина ${inputName}: ${minlength} символ${sufix}. Максимальна: ${maxlength}.`
  }

  public updatePassword(password, form): void {
    for (const i in this.newPassForm.controls) {
      this.newPassForm.controls[i].markAsDirty();
      this.newPassForm.controls[i].updateValueAndValidity();
    }

    if (this.newPassForm.valid) {
      this.password = null;
      this.updateUser.updatePass(password, form);
    }
  }

  ngOnInit() {
    this.initPassForm();
  }

}
