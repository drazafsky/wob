import { createFeatureSelector, createSelector } from "@ngrx/store";
import { WikipediaEdit } from "src/app/models/edit.model";
import { WikipediaState } from "src/app/reducers/wikipedia/wikipedia.reducers";

// Get the wikipedia state from the store
export const selectWikipediaState = createFeatureSelector<WikipediaState>('wikipedia');

// Get all the edits received
export const selectEditsState = (props: { fields: (keyof WikipediaEdit)[], filter: string }) => {
  return createSelector(
    selectWikipediaState,
    state => {
      if (!props.filter || props.filter === '') {
        return state.items
      }
      
      return state.items.filter(item => {
        const strTest = new RegExp(props.filter, 'i')

        const filteredTestResults = props.fields.map(field => strTest.test(item[field]))
                              .filter(Boolean)
        
        return filteredTestResults.length > 0
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
  state => {
    const domParser = new DOMParser()

    return state.pageStats.map(pageStat => {
      const wordCount = domParser.parseFromString(pageStat.text, 'text/html').documentElement.textContent?.split(' ').length

      return {
        wordCount: wordCount ? wordCount - 1 : 0,
        categories: pageStat.categories.map(category => category.category),
        title: pageStat.title,
        id: pageStat.pageid
      }
    })
  }
)