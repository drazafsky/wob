import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Action, Store } from "@ngrx/store";
import { from, of } from "rxjs";
import { concatMap, delay, mergeMap } from "rxjs/operators";
import { addEdit, WikipediaPubNubSubscribed, WikipediaPubNubUnsubscribed } from "src/app/actions/wikipedia/wikipedia.actions";

interface WikiCache { log: { entries: Array<{response: { content: { text: string }}}>}}

@Injectable({ providedIn: 'root' })
export class WikipediaCachedService {
  private edits: Array<{ message: string }> = []

  constructor(
    private readonly store: Store,
    private httpClient: HttpClient,
  ) { }
  
  public subscribe(): Action {
    this.httpClient.get<WikiCache>('assets/data/wikipedia.json')
      .subscribe((response: WikiCache) => {
        this.edits = response.log.entries.map(entry => ({ message: entry.response.content.text }))
        
        from(this.edits)
          .pipe(
            // make observable to emit each element of the array (not the whole array)
            mergeMap((x: { message: string }) => from([x])),
            // delay each element by 1 sec
            concatMap(x => of(x)
              .pipe(
                delay(Math.random() * (250 - 2 + 1) + 2)
              )
            )
          )
          .subscribe(edit => this.handleMessage(edit))
      })

    return { type: WikipediaPubNubSubscribed };
  }
  
  public unsubscribe(): Action {
    return { type: WikipediaPubNubUnsubscribed };
  }
  
  private handleMessage(edit: { message: string }): void {
    const parsedMessage = JSON.parse(edit.message)
    
    if (parsedMessage?.m[0]?.d) {
      this.store.dispatch(addEdit({ edit: parsedMessage.m[0].d }));
    }
  }
}