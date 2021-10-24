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
        const strTest = new RegExp(props.filter, 'i')

        return strTest.test(item.country)
        || strTest.test(item.event)
        || strTest.test(item.item)
        || strTest.test(item.user)
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