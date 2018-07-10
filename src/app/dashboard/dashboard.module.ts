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

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { CurrentService } from '../shared/services/current.service';
import { MessagesService } from './../shared/services/messages.service';
import { NzModalService } from 'ng-zorro-antd';
import { isUser, isGuest } from '../shared/guards/auth.guard';
import { UpdateUserService } from './services/update-user.service';
import { MyCountersComponent } from './pages/my-counters/my-counters.component';
import { AsideComponent } from './components/aside/aside.component';
import { CountersComponent } from './components/counters/counters.component';
import { CommonModule } from '@angular/common';
import { MyCalculationsComponent } from './pages/my-calculations/my-calculations.component';
import { CalculationsTableComponent } from './components/calculations-table/calculations-table.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { NewCalculationComponent } from './pages/new-calculation/new-calculation.component';
import { CalculationsService } from './services/calculations.service';
import { SharedModule } from './../shared/shared.module';
import { CountersService } from './services/counters.service';
import { AuthService } from './../shared/services/auth.service';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    DashboardComponent,
    SettingsComponent,
    MyCountersComponent,
    AsideComponent,
    CountersComponent,
    MyCalculationsComponent,
    CalculationsTableComponent,
    NewCalculationComponent,
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    SharedModule,
    ChartsModule
  ],
  providers: [
    AuthService,
    CurrentService,
    CountersService,
    MessagesService,
    NzModalService,
    isUser,
    isGuest,
    UpdateUserService,
    CalculationsService
  ]
})
export class DashboardModule { }