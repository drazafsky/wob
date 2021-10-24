import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { EventSubscriberComponent } from './event-subscriber.component';

const mockStore = {
  
}

describe('EventSubscriberComponent', () => {
  let component: EventSubscriberComponent;
  let fixture: ComponentFixture<EventSubscriberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventSubscriberComponent ],
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
    fixture = TestBed.createComponent(EventSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
