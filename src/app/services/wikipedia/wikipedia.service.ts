import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { WikipediaStats, WikipediaStatsResponse } from 'src/app/models/stats.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {
  private pageStats: Map<string, Observable<WikipediaStats>> = new Map<string, Observable<WikipediaStats>>()

  constructor(private readonly http: HttpClient) { }
  
  getPageContent(pageTitle: string): Observable<WikipediaStats> {
    // If we already retrieved stats for the page, don't retrieve them again
    if (this.pageStats.has(pageTitle)) {
      const existingStats = this.pageStats.get(pageTitle)
      if (existingStats !== undefined)
        return existingStats
    }

    // Construct the api request
    const url = new URL('/w/api.php', environment.wikipedia.en.apiBaseUrl)
    url.searchParams.append('action', 'parse')
    url.searchParams.append('page', pageTitle)
    url.searchParams.append('prop', 'text|categories')
    url.searchParams.append('formatversion', '2')
    url.searchParams.append('format', 'json')
    url.searchParams.append('origin', '*')
    
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Accept-Encoding': 'gzip',
    })

    // Make the api request
    const stats = this.http.get<WikipediaStatsResponse>(
      url.toString(),
    )
    .pipe(
      map((response: WikipediaStatsResponse) => response.parse)
    )
    
    // Store the stats for later
    this.pageStats.set(pageTitle, stats)
    
    // Let ngrx know we're done
    return stats
  }
}
