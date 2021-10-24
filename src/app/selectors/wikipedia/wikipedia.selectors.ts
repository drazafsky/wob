import { createFeatureSelector, createSelector } from "@ngrx/store";
import { WikipediaState } from "src/app/reducers/wikipedia/wikipedia.reducers";

// Get the wikipedia state from the store
export const selectWikipediaState = createFeatureSelector<WikipediaState>('wikipedia');

// Get last 10 edits received
export const selectEditsState = createSelector(
  selectWikipediaState,
  state => state.items
)

// Get total edit count
export const selectEditCount = createSelector(
  selectWikipediaState,
  state => state.totalCount
)

// Get subscription state
export const selectSubscriptionState = createSelector(
  selectWikipediaState,
  state => state.subscribed
)

// Get selected page stats
export const selectPageStats = createSelector(
  selectWikipediaState,
  state => state.pageStats
)