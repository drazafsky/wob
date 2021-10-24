import { ChartsModule } from './../../../../components/charts/charts.module';
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
import { EventSubscriberComponent } from '../../../../components/wikipedia/event-subscriber/event-subscriber.component';
import { EventUnsubscriberComponent } from '../../../../components/wikipedia/event-unsubscriber/event-unsubscriber.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    WikipediaEventsComponent,
    EventSubscriberComponent,
    EventUnsubscriberComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WikipediaEventsRoutingModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forFeature('wikipedia', reducers),
    EffectsModule.forFeature([WikipediaEffects]),
    ChartsModule,
  ]
})
export class WikipediaEventsModule { }
