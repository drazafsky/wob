import { TestBed } from '@angular/core/testing';
import * as Pubnub from 'pubnub';

import { PubnubService } from './pubnub.service';

describe('PubnubService', () => {
  let service: PubnubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PubnubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should create a PubNub instance', () => {
    const ret = service.create('fake-subscription-key');
    expect(ret).toBeInstanceOf(Pubnub);
  });
});
