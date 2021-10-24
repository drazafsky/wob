import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WikipediaEventsComponent } from './wikipedia-events.component';

const routes: Routes = [{ path: '', component: WikipediaEventsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WikipediaEventsRoutingModule { }
