import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "sign-in",
    loadChildren: "../core/core.module#SignInComponent"
  },
  {
    path: "sign-up",
    loadChildren: "../core/core.module#SignUpComponent"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
