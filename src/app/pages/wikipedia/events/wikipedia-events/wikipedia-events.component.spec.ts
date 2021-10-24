import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikipediaEventsComponent } from './wikipedia-events.component';

describe('WikipediaEventsComponent', () => {
  let component: WikipediaEventsComponent;
  let fixture: ComponentFixture<WikipediaEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WikipediaEventsComponent ]
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
