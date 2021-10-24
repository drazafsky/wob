import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'wikipedia', loadChildren: () => import('./pages/wikipedia/events/wikipedia-events/wikipedia-events.module').then(m => m.WikipediaEventsModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
