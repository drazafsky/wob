import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { addEdit, getPageStats, updatePageStats, subscribeEdits, unsubscribeEdits } from 'src/app/actions/wikipedia/wikipedia.actions';
import { WikipediaEdit } from 'src/app/models/edit.model';
import { WikipediaStats } from 'src/app/models/stats.model';

// Hold all the different states for the different reducers in the module
export interface WikipediaState {
  items: ReadonlyArray<WikipediaEdit>,
  totalCount: number,
  subscribed: boolean,
  pageStats: WikipediaStats,
}

const initialState: Readonly<WikipediaState> = {
  items: [],
  totalCount: 0,
  subscribed: false,
  pageStats: {
    title: '',
    pageid: 0,
    text: '',
    categories: [],
  },
}

// Reducer for handling edits
export const editsReducer = createReducer(
  initialState.items,
  on(addEdit, (state, { edit }) => {
    const modifiedEdit: WikipediaEdit = {
      ...edit,
      country: edit.country.substr(1, 2)
    }
    return [...state, modifiedEdit]
  }),
)

// Reducer for handling count of edits
export const countReducer = createReducer(
  initialState.totalCount,
  on(addEdit, (state) => state + 1)
)

// Reducer for handling subscription events
export const subscriptionReducer = createReducer(
  initialState.subscribed,
  on(subscribeEdits, () => true),
  on(unsubscribeEdits, () => false),
);
  
// Reducer for handling getting page stats
export const pageStatsReducer = createReducer(
  initialState.pageStats,
  on(getPageStats, (state, stats) => stats),
  on(updatePageStats, (state, { stats }) => stats),
)
  
// Specify reducers for each property of the module state
export const reducers: ActionReducerMap<WikipediaState> = {
  items: editsReducer,
  totalCount: countReducer,
  subscribed: subscriptionReducer,
  pageStats: pageStatsReducer,
}