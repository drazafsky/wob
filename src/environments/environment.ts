// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  pubnub: {
    wikipedia: {
      subscriptionKey: 'sub-c-b0d14910-0601-11e4-b703-02ee2ddab7fe',
      channels: [ 'pubnub-wikipedia' ],
      useCachedEvents: false
    }
  },
  wikipedia: {
    en: {
      apiBaseUrl: 'https://en.wikipedia.org/w/api.php'
    }
  }
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
