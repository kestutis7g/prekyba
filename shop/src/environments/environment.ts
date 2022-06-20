// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //APIUrl: 'https://localhost:7285/api/'
  APIUrl: 'https://localhost:44372/api/',
  productId: '19a7c7ab-6137-45eb-b86d-6a717f900000',
  // trustyApi: 'https://trustyapi.azurewebsites.net/api',
  trustyApi: 'https://localhost:44388/api',
  // trustyWeb: 'https://trusty-web.herokuapp.com/sso/login',
  trustyWeb: 'http://localhost:4200/sso/login',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
