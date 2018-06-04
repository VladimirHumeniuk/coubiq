import { CountersService } from './services/counters.service';
import { AuthService } from './../shared/services/auth.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Routing
import { DashboardRoutingModule } from './dashboard-routing.module';

// Core module
import { DashboardComponent } from './dashboard.component';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../../environments/environment';

// 3rd party modules
import { NgZorroAntdModule } from 'ng-zorro-antd';

// Components
import { NavbarComponent } from './components/navbar/navbar.component';

// Pages
import { CurrentService } from '../shared/services/current.service';
import { SettingsComponent } from './pages/settings/settings.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { UpdateUserService } from './services/update-user.service';
import { MyCountersComponent } from './pages/my-counters/my-counters.component';
import { AsideComponent } from './components/aside/aside.component';
import { CountersComponent } from './components/counters/counters.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    SettingsComponent,
    MyCountersComponent,
    AsideComponent,
    CountersComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    CurrentService,
    CountersService,
    AuthGuard,
    UpdateUserService
  ]
})
export class DashboardModule { }