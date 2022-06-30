// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { getAuth, provideAuth } from "@angular/fire/auth";

export const environment = {
  production: false,
  url_api: 'http://localhost:4040',
  firebase: {
    projectId: 'my-school-unab',
    appId: '1:346823626463:web:f043aa87e85047e60de36a',
    storageBucket: 'my-school-unab.appspot.com',
    apiKey: 'AIzaSyAMJZ0d9QNlrGGgjHxuKEoNy1acugzWOHc',
    authDomain: 'my-school-unab.firebaseapp.com',
    messagingSenderId: '346823626463',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
