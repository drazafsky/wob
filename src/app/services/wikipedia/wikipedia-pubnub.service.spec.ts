import { PubnubService } from '../pubnub/pubnub.service';
import { TestBed } from '@angular/core/testing';

import { WikipediaPubnubService } from './wikipedia-pubnub.service';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { WikipediaPubNubSubscribed, WikipediaPubNubUnsubscribed } from 'src/app/actions/wikipedia/wikipedia.actions';

const mockPubnub = {
  addListener: jasmine.createSpy('addListener'),
  subscribe: jasmine.createSpy('subscribe'),
  unsubscribeAll: jasmine.createSpy('unsubscribe'),
}

const mockStore = {
  dispatch: jasmine.createSpy('dispatch'),
}

const mockPubnubService = {
  create: () => mockPubnub,
}

describe('WikipediaService', () => {
  let service: WikipediaPubnubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PubnubService,
          useValue: mockPubnubService,
        },
        {
          provide: Store,
          useValue: mockStore,
        }
      ]
    });
    service = TestBed.inject(WikipediaPubnubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should return subscribed action', () => {
    const ret = service.subscribe();
    expect(ret).toEqual({ type: WikipediaPubNubSubscribed })
  });
  
  it('should subscribe to pubnub channel', () => {
    expect(mockPubnub.subscribe).toHaveBeenCalledOnceWith({ channels: environment.pubnub.wikipedia.channels });
  }); 
  
  it('should return unsubscribed action', () => {
    const ret = service.unsubscribe();
    expect(ret).toEqual({ type: WikipediaPubNubUnsubscribed })
  });
});
