import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScatterPlotComponent } from './scatter/scatter-plot.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    ScatterPlotComponent,
    BarChartComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ScatterPlotComponent,
    BarChartComponent,
  ]
})
export class ChartsModule { }
