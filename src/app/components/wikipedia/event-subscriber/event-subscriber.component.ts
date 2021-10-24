import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { subscribeEdits } from 'src/app/actions/wikipedia/wikipedia.actions';
import { WikipediaState } from 'src/app/reducers/wikipedia/wikipedia.reducers';

@Component({
  selector: 'wob-event-subscriber',
  templateUrl: './event-subscriber.component.html',
  styleUrls: ['./event-subscriber.component.scss']
})
export class EventSubscriberComponent implements OnInit {
  @Output('subscribe')
  subscribe = new EventEmitter<boolean>()

  constructor(private readonly store: Store<WikipediaState>) { }

  ngOnInit(): void {
  }

  onStartEvents() {
    this.subscribe.emit(true)
    return this.store.dispatch(subscribeEdits())
  }
  
}
