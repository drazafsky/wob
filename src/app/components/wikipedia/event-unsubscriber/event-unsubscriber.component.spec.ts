import { Store } from '@ngrx/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventUnsubscriberComponent } from './event-unsubscriber.component';

const mockStore = {

}

describe('EventUnsubscriberComponent', () => {
  let component: EventUnsubscriberComponent;
  let fixture: ComponentFixture<EventUnsubscriberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventUnsubscriberComponent ],
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
    fixture = TestBed.createComponent(EventUnsubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
