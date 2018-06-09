import { SharedModule } from './../shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { RegistrationService } from './services/registration.service';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../../environments/environment';

// 3rd party modules
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { AuthService } from '../shared/services/auth.service';
import { CurrentService } from '../shared/services/current.service';
import { AuthGuard } from '../shared/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CoreRoutingModule,
    SharedModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    SignUpComponent,
    SignInComponent,
    HomeComponent
  ],
  providers: [
    RegistrationService,
    AuthService,
    CurrentService,
    AuthGuard
  ]
})
export class CoreModule { }
