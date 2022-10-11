// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverUrl : "http://localhost:44607/api/v1.0/tweets",  //"https://localhost:44323/api/v1.0/tweets", 
  tokenKeyName : "425d9d6e-8d40-48d3-8f96-1617ac80acb2",
  userapiUrl : "http://localhost:47535/api/UserInformation",
  tweetapiUrl : "http://localhost:26752/api/Tweets",
  authapiUrl : "http://localhost:47535/api/Authentication"
};

/*

 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
