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
      
      return filterItems(state, props)
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
export const selectPageStats = (props: { fields: (keyof WikipediaEdit)[], filter: string }) => {
  return createSelector(
    selectWikipediaState,
    state => {
      const domParser = new DOMParser()
      const emptyStat = {
        wordCount: 0,
        categories: [],
        title: '',
        id: 0
      }
      
      const filteredItems = filterItems(state, props)
      const filteredPageTitles = filteredItems.map(fi => fi.item)

      return state.pageStats.map(pageStat => {
        if (!filteredPageTitles.includes(pageStat.title))
          return emptyStat 

        const wordCount = domParser
          .parseFromString(pageStat.text, 'text/html')
          .documentElement
          .textContent
          ?.split(' ')
          .length

        return {
          wordCount: wordCount ? wordCount - 1 : 0,
          categories: pageStat.categories.map(category => category.category),
          title: pageStat.title,
          id: pageStat.pageid
        }
      })
      .filter(stat => stat.id !== 0)
    }
  )
}

const filterItems = (state: WikipediaState, props: { fields: (keyof WikipediaEdit)[], filter: string }) => {
  const strTest = new RegExp(props.filter, 'i')

  if (!props.fields || props?.fields?.length < 1) {
    // No fields selected so compare on all fields
    return state.items.filter(item => {
      const keys = Object.keys(item) as Array<keyof typeof item>
      const filteredTestResults = keys.map(field => strTest.test(item[field]))
                          .filter(Boolean)
    
      return filteredTestResults.length > 0
    })
  }
  
  // Filter on selected fields only
  return state.items.filter(item => {
    const filteredTestResults = props.fields.map(field => strTest.test(item[field]))
                          .filter(Boolean)
    
    return filteredTestResults.length > 0
  })
}