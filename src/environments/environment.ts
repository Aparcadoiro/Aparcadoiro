// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  //configuracion para concetar firebase
  firebaseConfig: {
      projectId: 'useraparcadoiro',
      appId: '1:400502344240:web:97ce02c749d52a9ee1fbf5',
      storageBucket: 'useraparcadoiro.appspot.com',
      apiKey: 'AIzaSyB9w9gHqdzLYXBBWaV05NANICiYm78Hw5Q',
      authDomain: 'useraparcadoiro.firebaseapp.com',
      messagingSenderId: '400502344240',
      measurementId: 'G-XT0GCGG3L4',
  },

  //implementacion del mapa MAPBOX 
  mapboxkey: 'pk.eyJ1IjoiYXBhcmNhZG9pcm8iLCJhIjoiY2wwbXQ1aHBvMDJ3MDNpbzc2azBqN21sdSJ9.xGics-9pJigXt0T5eAwg7g'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
