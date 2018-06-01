import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { MyCountersComponent } from './pages/my-counters/my-counters.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "sign-in",
    component: SignInComponent
  },
  {
    path: "sign-up",
    component: SignUpComponent
  },
  {
    path: "settings",
    component: SettingsComponent
  },
  {
    path: "my-counters",
    component: MyCountersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
