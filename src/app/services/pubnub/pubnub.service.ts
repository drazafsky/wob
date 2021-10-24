import { Injectable } from '@angular/core';
import * as Pubnub from 'pubnub';

@Injectable({
  providedIn: 'root'
})
export class PubnubService {

  constructor() { }
  
  public create(subscriptionKey: string): Pubnub {
    return new Pubnub({subscribeKey: subscriptionKey});
  }
}
