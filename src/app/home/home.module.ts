import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Routing
import { HomeRoutingModule } from './home-routing.module';

// Core module
import { HomeComponent } from './home.component';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../../environments/environment';

// 3rd party modules
import { NgZorroAntdModule } from 'ng-zorro-antd';

// Pages
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { RegistrationService } from './services/registration.service';
import { AuthService } from '../shared/services/auth.service';
import { CurrentService } from '../shared/services/current.service';
import { AuthGuard } from '../shared/guards/auth.guard';

@NgModule({
  declarations: [
    HomeComponent,
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    RegistrationService,
    AuthService,
    CurrentService,
    AuthGuard
  ]
})
export class HomeModule { }
