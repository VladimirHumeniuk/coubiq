import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "dashboard",
    loadChildren: "../dashboard/dashboard.module#DashboardModule"
  },
  {
    path: "home",
    loadChildren: "../home/home.module#HomeModule"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
