import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { subscribeEdits, unsubscribeEdits } from 'src/app/actions/wikipedia/wikipedia.actions';
import { WikipediaEdit } from 'src/app/models/edit.model';
import { WikipediaState } from 'src/app/reducers/wikipedia/wikipedia.reducers';
import { selectEditsState } from 'src/app/selectors/wikipedia/wikipedia.selectors';

@Component({
  selector: 'wob-wikipedia-events',
  templateUrl: './wikipedia-events.component.html',
  styleUrls: ['./wikipedia-events.component.scss']
})
export class WikipediaEventsComponent implements OnInit {
  @ViewChild('eventPaginator', { static: true })
  private readonly pagniator!: MatPaginator;
  
  events$: Observable<ReadonlyArray<WikipediaEdit>> = this.store.select(selectEditsState)

  noData: Array<WikipediaEdit> = [<WikipediaEdit>{}]
  dataSource: MatTableDataSource<WikipediaEdit> = new MatTableDataSource<WikipediaEdit>(this.noData)
  displayedColumns = [ 'Country', 'Event', 'Item', 'Link', 'User', 'Stats' ]
  pageSizeOptions = [5, 10, 15]
  
  isListeningToEvents: boolean = false

  constructor(private readonly store: Store<WikipediaState>) { }

  ngOnInit(): void {
    this.events$.subscribe(events => {
      const tableEvents = [...events]
      this.dataSource = new MatTableDataSource<WikipediaEdit>(tableEvents)
      this.dataSource.paginator = this.pagniator
    })
  }
  
  onStartEvents() {
    this.isListeningToEvents = true
    return this.store.dispatch(subscribeEdits())
  }

  onStopEvents() {
    this.isListeningToEvents = false
    return this.store.dispatch(unsubscribeEdits())
  }
}
