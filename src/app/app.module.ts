import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { ResultsComponent } from './results/results.component';
import { CarFormComponent } from './car-form/car-form.component';

import { HelpersService } from './services/helpers.service';

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    CarFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [HelpersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
