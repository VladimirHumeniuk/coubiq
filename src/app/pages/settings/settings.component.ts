import { CitiesUa } from './../../shared/enums/cities-ua.enum';
import { Countries } from './../../shared/enums/countries.enum';
import { CurrentService } from './../../shared/services/current.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UpdateUserService } from '../../shared/services/update-user.service';
import * as firebase from 'firebase/app';
import { NzCollapseModule } from 'ng-zorro-antd';
import { User } from '../../shared/interfaces/user';

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

  constructor(
    public db: AngularFireDatabase,
    public currentService: CurrentService,
    public updateUser: UpdateUserService
  ) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.currentEmail = user.email;
      }
    });
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
    }

    this.updateUser.updateUserData(uid, user, this.currentEmail);
  }

  ngOnInit() {}
}
