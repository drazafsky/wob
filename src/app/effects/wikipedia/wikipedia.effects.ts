import { WikipediaEdit } from 'src/app/models/edit.model';
import { WikipediaAddEdit, updatePageStats } from './../../actions/wikipedia/wikipedia.actions';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from 'rxjs/operators';
import { ObservableInput, of } from 'rxjs';
import { WikipediaSubscribe, WikipediaUnsubscribe } from "src/app/actions/wikipedia/wikipedia.actions";
import { WikipediaPubnubService } from "src/app/services/wikipedia/wikipedia-pubnub.service";
import { WikipediaService } from "src/app/services/wikipedia/wikipedia.service";

@Injectable()
export class WikipediaEffects {
  subscribeEdits$ = createEffect(() => this.actions$.pipe(
      ofType(WikipediaSubscribe),
      map(() => this.wikipediaPubnubService.subscribe())
    )
  );
  
  unsubscribeEdits$ = createEffect(() => this.actions$.pipe(
      ofType(WikipediaUnsubscribe),
      map(() => this.wikipediaPubnubService.unsubscribe())
    )
  );
  
  getStats$ = createEffect(() => this.actions$.pipe(
    ofType(WikipediaAddEdit),
    switchMap((props: { edit: WikipediaEdit }) => this.wikipediaService.getPageContent(props.edit.item)
      .pipe(
        map(stats => {
          const allStats = this.wikipediaService.getStats()

          if (stats === undefined) {
            return [...allStats]
          }

          return updatePageStats({ stats: [...allStats]})
        }),
        catchError(err => this.handleError(err))
      )
    ),
  ))
  
  constructor(
    private readonly actions$: Actions,
    private wikipediaPubnubService: WikipediaPubnubService,
    private wikipediaService: WikipediaService,
  ) { }
  
  private handleError(error: Error): ObservableInput<any> {
    console.error(error)
    return of({ type: `[Wikipedia Effects] Error - ${error.message}` })
  }
}