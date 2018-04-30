import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RegistrationService } from "../../shared/services/registration.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public registration: FormGroup;

  constructor(
    private fb: FormBuilder,
    public regService: RegistrationService
  ) { }

  initForm() {
    this.registration = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
      country: [''],
      city: ['']
    })
  }

  ngOnInit() {
    this.initForm();
  }

}
