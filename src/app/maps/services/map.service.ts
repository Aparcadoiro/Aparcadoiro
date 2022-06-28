import { Injectable } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MapService {


  constructor(private http: HttpClient, private router: Router) { }

  cargarMapa(latitud: number, longitud: number, parqueaderos) {

    // token proporcionado por mapbox
    Mapboxgl.accessToken = environment.mapboxkey;
    // creamos la constante del mapa
    const map = new Mapboxgl.Map({
      //con sus estilos
      style: 'mapbox://styles/mapbox/streets-v11',
      // la posición en la que se va centrar el mapa al abrirse en ese caso la posición de nuestro usuario
      center: [longitud, latitud],
      // el zoom predeterminado al abrirse 
      zoom: 10.3,
      // el div donde se va cargar el mapa
      container: 'mapa4321',
    });
    map.addControl(new Mapboxgl.FullscreenControl(), 'top-left');
    map.addControl(new Mapboxgl.NavigationControl(), 'top-left');
    //recorremos lso marcadores
    for (const feature of parqueaderos.features) {
      // creamos un HTML element para cada feactures
      const popupContent = document.createElement('div');

      popupContent.innerHTML = `
      <ion-grid>
        <ion-row>
          <ion-col size="12">
          <ion-img src='${feature.properties.imagen}'></ion-img>
          </ion-col>
          <ion-col size="12">
            <h6>Direccion:</h6>
            <span>${feature.properties.direccion}</span>
          </ion-col>
          <ion-col size="6">
          <h6>precios</h6>
          <span class="mt-1">
            $ ${feature.properties.precioxAuto}
          </span>
          </br>
          <span class="mt-1">
            $ ${feature.properties.precioxMoto}
          </span>
          </br>
          <span class="mt-1">
            $ ${feature.properties.precioxBici}
          </span>
          </ion-col>
          <ion-col size="6">
            <h6>vehiculos:</h6>
            <span>carros</span></br>
            <span>motos</span></br>
            <span>bicicletas</span></br>
          </ion-col>
        </ion-row>
      </ion-grid>`;



      let popup = new Mapboxgl.Popup({
      }).setDOMContent(popupContent);
      const marcador = document.createElement('div');
      marcador.className = 'marker';
      // agregarmos el marcador al mapa
      new Mapboxgl.Marker(marcador).setLngLat(feature.geometry.coordinates).setPopup(popup).addTo(map);
    }

    return map
  }
  cargarMapaInicio(latitud: number, longitud: number, parqueaderos) {

    // token proporcionado por mapbox
    Mapboxgl.accessToken = environment.mapboxkey;
    // creamos la constante del mapa
    const map = new Mapboxgl.Map({
      //con sus estilos
      style: 'mapbox://styles/mapbox/streets-v11',
      // la posición en la que se va centrar el mapa al abrirse en ese caso la posición de nuestro usuario
      center: [longitud, latitud],
      // el zoom predeterminado al abrirse 
      zoom: 10.3,
      // el div donde se va cargar el mapa
      container: 'mapaInicio',
    });
    map.addControl(new Mapboxgl.FullscreenControl(), 'top-left');
    map.addControl(new Mapboxgl.NavigationControl(), 'top-left');
    //recorremos lso marcadores
    for (const feature of parqueaderos.features) {
      // creamos un HTML element para cada feactures
      const popupContent = document.createElement('div');

      popupContent.innerHTML = `
      <ion-grid>
        <ion-row>
          <ion-col size="12">
          <ion-img src='${feature.properties.imagen}'></ion-img>
          </ion-col>
          <ion-col size="12">
            <h6>Direccion:</h6>
            <span>${feature.properties.direccion}</span>
          </ion-col>
          <ion-col size="6">
          <h6>precios</h6>
          <span class="mt-1">
            $ ${feature.properties.precioxAuto}
          </span>
          </br>
          <span class="mt-1">
            $ ${feature.properties.precioxMoto}
          </span>
          </br>
          <span class="mt-1">
            $ ${feature.properties.precioxBici}
          </span>
          </ion-col>
          <ion-col size="6">
            <h6>vehiculos:</h6>
            <span>carros</span></br>
            <span>motos</span></br>
            <span>bicicletas</span></br>
          </ion-col>
        </ion-row>
      </ion-grid>`;



      let popup = new Mapboxgl.Popup({
      }).setDOMContent(popupContent);
      const marcador = document.createElement('div');
      marcador.className = 'marker';
      // agregarmos el marcador al mapa
      new Mapboxgl.Marker(marcador).setLngLat(feature.geometry.coordinates).setPopup(popup).addTo(map);
    }

    return map
  }
  dibujarRuta(cordenadasCar, cordenadasPar) {

    //console.log(cordenadasPar);

    return this.http.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${cordenadasCar[0]},${cordenadasCar[1]};${cordenadasPar[0]},${cordenadasPar[1]}?steps=true&geometries=geojson&access_token=${environment.mapboxkey}`)
  }
}
