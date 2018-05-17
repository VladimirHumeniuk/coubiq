import { CitiesUa } from './../../shared/enums/cities-ua.enum';
import { Countries } from './../../shared/enums/countries.enum';
import { CurrentService } from './../../shared/services/current.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UpdateUserService } from '../../shared/services/update-user.service';
import * as firebase from 'firebase/app';
import { NzCollapseModule } from 'ng-zorro-antd';
import { User } from '../../shared/interfaces/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EqualValidator } from '../../shared/directives/validate-equal.directive';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  protected nameMinLength: number = 4;
  protected nameMaxLength: number = 36;
  protected passMinLength: number = 6;
  protected passMaxLength: number = 30;

  public emailRegex = "[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})";

  public invalidEmail: string = 'Емейл не дійсний.';
  public passwordNotEqual: string = 'Паролі не співпадають.';
  public noCitySelected: string = 'Оберіть місто.';

  public selectedCountry: string = Countries.Ukraine;

  public countryData = Object.values(Countries);
  public cityData = {
    Україна: Object.values(CitiesUa)
  };
  public currentEmail: string;
  public dataChanged: boolean = false;

  public newPassForm: FormGroup;
  public password: string;
  public passwordChanged: boolean = false;

  public current;

  constructor(
    public db: AngularFireDatabase,
    private fb: FormBuilder,
    public currentService: CurrentService,
    public updateUser: UpdateUserService
  ) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.currentEmail = user.email;
      }
    });
  }

  initPassForm() {
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

  updateUserData(
    uid: string,
    username: string,
    email: string,
    country: string,
    city: string
  ): void {

    const user: User = {
      username: username,
      email: email,
      country: country,
      city: city
    };

    this.updateUser.updateUserData(uid, user, this.currentEmail);
    this.dataChanged = true;
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.newPassForm.controls[controlName];
    const result = control.invalid && control.touched;

    return result;
  }

  minLengthError(inputName: string, minlength: number, maxlength: number): string {
    const sufix = minlength < 5 ? "и" : "ів";
    return `Мінімальна довжина ${inputName}: ${minlength} символ${sufix}. Максимальна: ${maxlength}.`
  }

  updatePassword(password, form): void {
    for (const i in this.newPassForm.controls) {
      this.newPassForm.controls[i].markAsDirty();
      this.newPassForm.controls[i].updateValueAndValidity();
    }

    if (this.newPassForm.valid) {
      this.password = null;
      this.updateUser.updatePass(password, form);

      this.password = null;
    }
  }

  ngOnInit() {
    this.initPassForm();
  }
}
