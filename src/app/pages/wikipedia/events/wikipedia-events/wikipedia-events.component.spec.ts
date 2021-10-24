import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { WikipediaEventsComponent } from './wikipedia-events.component';

const mockEdits = [
  {
    country: 'country #1',
    event: 'mock edit #1',
    item: 'mock item #1',
    link: 'mock link #1',
    user: 'mock user #1',
  },
  {
    country: 'country #2',
    event: 'mock edit #2',
    item: 'mock item #2',
    link: 'mock link #2',
    user: 'mock user #2',
  }
]

const mockObservable = of([mockEdits])

const mockStore = {
  select: () => { return mockObservable },
  subscribe: () => { },
}

describe('WikipediaEventsComponent', () => {
  let component: WikipediaEventsComponent;
  let fixture: ComponentFixture<WikipediaEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WikipediaEventsComponent ],
      providers: [
        {
          provide: Store,
          useValue: mockStore
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WikipediaEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
