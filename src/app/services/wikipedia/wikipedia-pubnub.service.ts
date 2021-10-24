import { PubnubService } from './../pubnub/pubnub.service';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import * as Pubnub from 'pubnub';
import { environment } from 'src/environments/environment';
import { addEdit, WikipediaPubNubSubscribed, WikipediaPubNubUnsubscribed } from 'src/app/actions/wikipedia/wikipedia.actions';

@Injectable({
  providedIn: 'root'
})
export class WikipediaPubnubService {
  private pubnub: Pubnub = this.pubnubFactory.create(environment.pubnub.wikipedia.subscriptionKey);

  constructor(
    private readonly pubnubFactory: PubnubService,
    private readonly store: Store
  ) {
    this.pubnub.addListener({ message: this.handleMessage.bind(this) });
  }
  
  public subscribe(): Action {
    this.pubnub.subscribe({ channels: environment.pubnub.wikipedia.channels });
    return { type: WikipediaPubNubSubscribed };
  }
  
  public unsubscribe(): Action {
    this.pubnub.unsubscribeAll();
    return { type: WikipediaPubNubUnsubscribed };
  }
  
  private handleMessage(message: Pubnub.MessageEvent): void {
    this.store.dispatch(addEdit({ edit: message.message }));
  }
}
