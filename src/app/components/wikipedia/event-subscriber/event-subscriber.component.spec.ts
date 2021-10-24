import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSubscriberComponent } from './event-subscriber.component';

describe('EventSubscriberComponent', () => {
  let component: EventSubscriberComponent;
  let fixture: ComponentFixture<EventSubscriberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventSubscriberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
