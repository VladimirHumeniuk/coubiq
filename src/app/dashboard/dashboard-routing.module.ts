import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './pages/settings/settings.component';
import { MyCountersComponent } from './pages/my-counters/my-counters.component';
import { DashboardComponent } from './dashboard.component';
import { MyCalculationsComponent } from './pages/my-calculations/my-calculations.component';
import { NewCalculationComponent } from './pages/new-calculation/new-calculation.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "my-counters",
    pathMatch: "full"
  },
  {
    path: "settings",
    component: DashboardComponent,
    children: [{
      path: "",
      component: SettingsComponent
    }]
  },
  {
    path: "my-counters",
    component: DashboardComponent,
    children: [{
      path: "",
      component: MyCountersComponent
    }]
  },
  {
    path: "my-calculations",
    component: DashboardComponent,
    children: [{
      path: "",
      component: MyCalculationsComponent,
    },
    {
      path: "new",
      component: NewCalculationComponent
    }]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
