import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { AppComponent } from './app.component';

const mockStore = {
  dispatch: jasmine.createSpy('dispatch'),
  subscribe: jasmine.createSpy('subscribe'),
  unsubscribe: jasmine.createSpy('unsubscribe'),
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: mockStore,
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
