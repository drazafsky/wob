import { createFeatureSelector, createSelector } from "@ngrx/store";
import { WikipediaState } from "src/app/reducers/wikipedia/wikipedia.reducers";

// Get the wikipedia state from the store
export const selectWikipediaState = createFeatureSelector<WikipediaState>('wikipedia');

// Get all the edits received
export const selectEditsState = (props: { filter: string }) => {
  return createSelector(
    selectWikipediaState,
    state => {
      if (!props.filter || props.filter === '') {
        return state.items
      }
      
      return state.items.filter(item => {
        return item.country.includes(props.filter)
        || item.event.includes(props.filter)
        || item.item.includes(props.filter)
        || item.user.includes(props.filter)
      })
    }
  )
}

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