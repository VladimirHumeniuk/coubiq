import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "sign-in",
    component: HomeComponent,
    children: [{
      path: "",
      component: SignInComponent
    }]
  },
  {
    path: "sign-up",
    component: HomeComponent,
    children: [{
      path: "",
      component: SignUpComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
