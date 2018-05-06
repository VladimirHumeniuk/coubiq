import { CitiesUa } from './../../shared/enums/cities-ua.enum';
import { Countries } from './../../shared/enums/countries.enum';
import { CurrentService } from './../../shared/services/current.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

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

  constructor(
    public db: AngularFireDatabase,
    public currentService: CurrentService
  ) {}

  ngOnInit() {
  }

}
