export const environment = {
  production: false,
  pubnub: {
    wikipedia: {
      subscriptionKey: 'sub-c-b0d14910-0601-11e4-b703-02ee2ddab7fe',
      channels: [ 'pubnub-wikipedia' ]
    }
  },
  wikipedia: {
    en: {
      apiBaseUrl: 'https://en.wikipedia.org/w/api.php'
    }
  }
}