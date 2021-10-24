import { MaterialModule } from './../../../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { WikipediaEventsRoutingModule } from './wikipedia-events-routing.module';
import { WikipediaEventsComponent } from './wikipedia-events.component';
import { WikipediaEffects } from 'src/app/effects/wikipedia/wikipedia.effects';
import { reducers } from 'src/app/reducers/wikipedia/wikipedia.reducers';

@NgModule({
  declarations: [
    WikipediaEventsComponent
  ],
  imports: [
    CommonModule,
    WikipediaEventsRoutingModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forFeature('wikipedia', reducers),
    EffectsModule.forFeature([WikipediaEffects])
  ]
})
export class WikipediaEventsModule { }
