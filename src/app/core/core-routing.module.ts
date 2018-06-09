import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { isUser, isGuest } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [isGuest]
  },
  {
    path: "sign-in",
    component: SignInComponent,
    canActivate: [isGuest]
  },
  {
    path: "sign-up",
    component: SignUpComponent,
    canActivate: [isGuest]
  },
  {
    path: "dashboard",
    loadChildren: "../dashboard/dashboard.module#DashboardModule",
    canActivate: [isUser]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
