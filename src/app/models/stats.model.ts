export interface WikipediaCategory {
  sortkey: string,
  category: string,
  hidden: boolean
}

export interface WikipediaStats {
  pageid: number,
  title: string,
  text: string,
  categories: ReadonlyArray<WikipediaCategory>,
}

export interface WikipediaStatsResponse {
  parse: WikipediaStats
  error: {
    code: string,
    info: string
  }
}

export interface ComputedWikipediaStats {
  wordCount: Readonly<number>,
  categories: ReadonlyArray<string>,
  title: Readonly<string>,
  id: Readonly<number>
}