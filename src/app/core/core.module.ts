import { CoreRoutingModule } from './core-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class CoreModule { }
