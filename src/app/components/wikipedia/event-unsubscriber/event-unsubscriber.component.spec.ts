import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventUnsubscriberComponent } from './event-unsubscriber.component';

describe('EventUnsubscriberComponent', () => {
  let component: EventUnsubscriberComponent;
  let fixture: ComponentFixture<EventUnsubscriberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventUnsubscriberComponent ]
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
