import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { WikipediaEdit } from 'src/app/models/edit.model';
import { WikipediaState } from 'src/app/reducers/wikipedia/wikipedia.reducers';
import { selectEditsState } from 'src/app/selectors/wikipedia/wikipedia.selectors';

@Component({
  selector: 'wob-wikipedia-events',
  templateUrl: './wikipedia-events.component.html',
  styleUrls: ['./wikipedia-events.component.scss']
})
export class WikipediaEventsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('eventPaginator', { static: true })
  private readonly pagniator!: MatPaginator
  
  @ViewChild('eventFilter', { static: true })
  private readonly eventFilter!: ElementRef
  
  events$: Observable<ReadonlyArray<WikipediaEdit>> = this.store.select(selectEditsState({ filter: '' }))
  subscriptions: Subscription = new Subscription();

  noData: Array<WikipediaEdit> = [<WikipediaEdit>{}]
  dataSource: MatTableDataSource<WikipediaEdit> = new MatTableDataSource<WikipediaEdit>(this.noData)
  displayedColumns = [ 'Country', 'Event', 'Item', 'Link', 'User', 'Stats' ]
  pageSizeOptions = [5, 10, 15]
  
  isListeningToEvents: boolean = false

  constructor(private readonly store: Store<WikipediaState>) { }

  ngOnInit(): void {
    this.setup()
  } 
  
  ngAfterViewInit(): void {
    this.subscriptions = fromEvent(this.eventFilter.nativeElement, 'keyup')
      .pipe(
          filter(Boolean),
          debounceTime(250),
          distinctUntilChanged(),
          tap(() => {
            this.events$ = this.store.select(selectEditsState({ filter: this.eventFilter.nativeElement.value }))
            this.setup()
          })
      )
      .subscribe()
  }
  
  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe()
    }
  }
  
  private setup(): void {
    this.events$.subscribe(events => {
      const tableEvents = [...events]
      this.dataSource = new MatTableDataSource<WikipediaEdit>(tableEvents)
      this.dataSource.paginator = this.pagniator
    })
  }
}
