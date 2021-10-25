import { environment } from 'src/environments/environment';
import { WikipediaCachedService } from './services/wikipedia/wikipedia-cached.service';
import { WikipediaPubnubService } from 'src/app/services/wikipedia/wikipedia-pubnub.service';
import { MaterialModule } from './material/material.module';
import { SafePipe } from './pipes/safe.pipe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    SafePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule, 
    MaterialModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  providers: [
    {
      provide: WikipediaPubnubService,
      useClass: environment.pubnub.wikipedia.useCachedEvents ? WikipediaCachedService : WikipediaPubnubService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
