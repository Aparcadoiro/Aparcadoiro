import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.page.html',
  styleUrls: ['./map-box.page.scss'],
})
export class MapBoxPage implements OnInit {

  constructor() { }
  mapa: Mapboxgl.Map;

  ngOnInit() {

    Mapboxgl.accessToken = environment.mapboxkey;
    this.mapa = new Mapboxgl.Map({
    container: 'mapa', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [ -74.222580, 4.711627], // starting position
    zoom: 14 // starting zoom
    });
    
    // Add zoom and rotation controls to the map.
    this.mapa.addControl(new Mapboxgl.NavigationControl());


  }
}
