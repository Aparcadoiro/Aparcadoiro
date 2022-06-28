import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

//configuracion de manera global para e usuao del mapa 
import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
//token de acceso 
Mapboxgl.accessToken = 'pk.eyJ1IjoiYXBhcmNhZG9pcm8iLCJhIjoiY2wwbXQ1aHBvMDJ3MDNpbzc2azBqN21sdSJ9.xGics-9pJigXt0T5eAwg7g';

//configuracion de la localizacion 
if( !navigator.geolocation){
  alert('Navegadro no soportado para la Geolocation')
  throw new Error('El navegador no soporta la alocalizacion')
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
