// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";

export const environment = {
  firebase: {
    projectId: 'ticket-scheduler-1c428',
    appId: '1:546587343163:web:a93c5a4eb4cc7497531f1e',
    databaseURL: 'https://ticket-scheduler-1c428-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'ticket-scheduler-1c428.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyCmghUp-PthiHXmWzeyggiVpTf_hSJLLyA',
    authDomain: 'ticket-scheduler-1c428.firebaseapp.com',
    messagingSenderId: '546587343163',
    measurementId: 'G-SDNPJYMBP7',
  },
  production: false,

};

// Initialize Firebase
// const app = initializeApp(environment.firebase);
// const analytics = getAnalytics(app);
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
