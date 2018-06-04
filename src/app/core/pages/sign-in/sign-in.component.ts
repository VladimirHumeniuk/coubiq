import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public background: string = '../../../assets/images/bg_sign-in.png';

  public authentication: FormGroup;
  public invalidEmail: string = 'Емейл не валідний.';
  public invalidPassword: string = 'Будь-ласка, ведіть пароль.';

  private emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService
  ) { }

  initForm() {
    this.authentication = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(this.emailRegex)
      ]],
      password: ['', [
        Validators.required
      ]]
    })
  }

  login(form) {
    for (const i in this.authentication.controls) {
      this.authentication.controls[i].markAsDirty();
      this.authentication.controls[i].updateValueAndValidity();
    }

    if (this.authentication.valid) {
      this.authService.auth(form);
    }
  }

  ngOnInit() {
    this.initForm();
  }

}
