# Wiki-o-Bot

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4321/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Configuration
If the PubNub channel is not publishing Wikipedia edit events, you can use a cached file (located at assets/data/wikipedia.json) to simulate publishing events by modifying the environment.ts or environment.prod.ts file and setting the `pubnub.wikipedia.useCachedEvents` key to `true`.

## Features
This is an experiment in getting familiar with multiple technologies in an Angular project.

#### NgRx
NgRx (https://ngrx.io/) is used for state mangement in the application. This has the additional benefit of allowing us to isolate side effects and easily move dependencies for retrieving and manipulating data outside of components.

#### PubNub
PubNub (https://www.pubnub.com/) provides a realtime data feed of edits made to the english language Wikipedia.

#### D3.js
D3.js (https://d3js.org/) is used for creating the data driven chart. This chart is updated in realtime as information about Wikipedia pages are retrieved based on the edits published in the PubNub channel.

#### Angular Material
Angular Material (https://material.angular.io/) provides the UI framework components for the application. This includes items such as the navbar and data table.

#### Wikipedia 

#### Additional Features
Because the PubNub feed seems to be unreliable and stops publishing data for long stretches of time, the application can be configured to make use of a cached version of published edits.

When an edit is received from the PubNub channel, an additional HTTP request is made to the Wikipedia API to get additional information about the page. Since Wikipedia's API is rate limited and will cancel requests if you exceed the limit, a request queue has been added to ensure that requests can be completed. The data returned from the Wikipedia API is then used to generate the D3js charts.