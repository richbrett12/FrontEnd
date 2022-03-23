// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  sitesApi: 'http://localhost:8080/',
  bffApi: 'http://localhost:8081/',
  pricingApi: 'http://localhost:8082/',
  defaultPricing: {
    baseAmount: 58,
    waterDaily: 10,
    electricalDaily: 35,
    lakeFrontDaily: 40,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
