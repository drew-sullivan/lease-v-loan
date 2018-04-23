import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { ResultsComponent } from './results/results.component';
import { CarFormComponent } from './car-form/car-form.component';

import { HelpersService } from './services/helpers.service';
import { GrandTotalLineChartComponent } from './grand-total-line-chart/grand-total-line-chart.component';
import { FormAnswerPipe } from './form-answer.pipe';
import { FormQuestionPipe } from './form-question.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    CarFormComponent,
    GrandTotalLineChartComponent,
    FormAnswerPipe,
    FormQuestionPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [HelpersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
