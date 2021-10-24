import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { unsubscribeEdits } from 'src/app/actions/wikipedia/wikipedia.actions';
import { WikipediaState } from 'src/app/reducers/wikipedia/wikipedia.reducers';

@Component({
  selector: 'wob-event-unsubscriber',
  templateUrl: './event-unsubscriber.component.html',
  styleUrls: ['./event-unsubscriber.component.scss']
})
export class EventUnsubscriberComponent implements OnInit {
  @Output('unsubscribe')
  unsubscribe = new EventEmitter<boolean>()

  constructor(private readonly store: Store<WikipediaState>) { }

  ngOnInit(): void {
  }

  onStopEvents() {
    this.unsubscribe.emit(false)
    return this.store.dispatch(unsubscribeEdits())
  }
}
