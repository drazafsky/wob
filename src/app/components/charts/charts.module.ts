import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './bar/bar-chart.component';

@NgModule({
  declarations: [
    BarChartComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    BarChartComponent
  ]
})
export class ChartsModule { }
