import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  
  events$: Observable<ReadonlyArray<WikipediaEdit>> = this.store.select(selectEditsState({ fields: [], filter: '' }))
  eventSubscription: Subscription = new Subscription();

  filterSubscriptions: Subscription = new Subscription();

  noData: Array<WikipediaEdit> = [<WikipediaEdit>{}]
  dataSource: MatTableDataSource<WikipediaEdit> = new MatTableDataSource<WikipediaEdit>(this.noData)
  displayedColumns = [ 'Country', 'Event', 'Item', 'Link', 'User', 'Stats' ]
  pageSizeOptions = [5, 10, 15]
  
  isListeningToEvents: boolean = false
  
  filterFields = new FormControl()

  constructor(private readonly store: Store<WikipediaState>) { }

  ngOnInit(): void {
    this.setup()
  } 
  
  ngAfterViewInit(): void {
    this.filterSubscriptions = fromEvent(this.eventFilter.nativeElement, 'keyup')
      .pipe(
          filter(Boolean),
          debounceTime(250),
          distinctUntilChanged(),
          tap(() => {
            this.events$ = this.store.select(selectEditsState({ fields: this.filterFields.value, filter: this.eventFilter.nativeElement.value }))
            this.setup()
          })
      )
      .subscribe()

      this.filterSubscriptions.add(
        this.filterFields.valueChanges.subscribe(() => {
          this.events$ = this.store.select(selectEditsState({ fields: this.filterFields.value, filter: this.eventFilter.nativeElement.value }))
          this.setup()
        })
      )
  }
  
  ngOnDestroy(): void {
    if (this.filterSubscriptions) {
      this.filterSubscriptions.unsubscribe()
    }
  }
  
  private setup(): void {
    if (this.eventSubscription) {
      // Needed to stop firing events for previous filter options
      this.eventSubscription.unsubscribe()
    }

    this.eventSubscription = this.events$.subscribe(events => {
      const tableEvents = [...events]
      this.dataSource = new MatTableDataSource<WikipediaEdit>(tableEvents)
      this.dataSource.paginator = this.pagniator
    })
  }
}
