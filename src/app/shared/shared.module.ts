import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule.forRoot(),
    SharedRoutingModule
  ],
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ]
})
export class SharedModule { }