import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WikipediaStats, WikipediaStatsResponse } from 'src/app/models/stats.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BackendService } from '../backend.service';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService extends BackendService {
  private pageStats: Map<string, WikipediaStats> = new Map<string, WikipediaStats>()

  constructor(private readonly http: HttpClient) {
    super(http)
  }
  
  getPageContent(pageTitle: string): Observable<WikipediaStats> {
    // If we already retrieved stats for the page, don't retrieve them again
    if (this.pageStats.has(pageTitle)) {
      const existingStats = this.pageStats.get(pageTitle)
      if (existingStats !== undefined) {
        return of(existingStats)
      }
    }

    // Construct the api request
    const url = new URL('/w/api.php', environment.wikipedia.en.apiBaseUrl)
    url.searchParams.append('action', 'parse')
    url.searchParams.append('page', pageTitle)
    url.searchParams.append('prop', 'text|categories')
    url.searchParams.append('formatversion', '2')
    url.searchParams.append('format', 'json')
    url.searchParams.append('origin', '*')

    // Make the api request
    const stats = this.invoke(url.toString(), 'GET')
      .pipe(
        map((response: WikipediaStatsResponse) => {
          this.pageStats.set(pageTitle, response.parse)
          return response.parse
        })
      )    

    return stats
  }
}
