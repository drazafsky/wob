import { createAction, props } from '@ngrx/store';
import { WikipediaEdit } from 'src/app/models/edit.model';
import { WikipediaStats } from 'src/app/models/stats.model';

export const WikipediaAddEdit = '[Wikipedia Service] Add Edit';

export const addEdit = createAction(
  WikipediaAddEdit,
  props<{ edit: WikipediaEdit }>(),
)

export const WikipediaSubscribe = '[Wikipedia Service] Subscribe Edits'
export const WikipediaPubNubSubscribed = '[WikipediaService Subscribe] Subscribed'
export const WikipediaUnsubscribe = '[Wikipedia Service] Unsubscribe Edits'
export const WikipediaPubNubUnsubscribed = '[WikipediaService Unsubscribe] Unsubscribed'

export const subscribeEdits = createAction(WikipediaSubscribe)
export const unsubscribeEdits = createAction(WikipediaUnsubscribe)

export const WikipediaGetPageStats = '[Wikipedia Service] Get Page Stats'
export const WikipediaUpdatePageStats = '[Wikipedia Service] Update Page Stats'

export const getPageStats = createAction(
  WikipediaGetPageStats,
  props<WikipediaStats>(),
)

export const updatePageStats = createAction(
  WikipediaUpdatePageStats,
  props<{ stats: WikipediaStats }>()
)
