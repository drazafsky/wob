import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScatterPlotComponent } from './scatter/scatter-plot.component';

@NgModule({
  declarations: [
    ScatterPlotComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ScatterPlotComponent
  ]
})
export class ChartsModule { }
