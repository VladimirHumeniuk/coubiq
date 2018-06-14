import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Core module
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';

import { NZ_I18N, uk_UA } from 'ng-zorro-antd';
import uk from '@angular/common/locales/uk';

registerLocaleData(uk);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: uk_UA }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }