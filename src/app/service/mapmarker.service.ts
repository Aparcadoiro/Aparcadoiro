import { Injectable } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl'
import { DirectionsApiClient } from '../maps/api/';
import { DirectionResponse, Route } from '../maps/interfaces/directions';
import { Feature } from '../maps/interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class MapmarkerService {

  //funcionamiento y llamado de la libreria de mapbox-gl
  private map?: Map;

  //creacion de un espacion para colocar los marcadores
  private markers: Marker [] = [];

  //llamado y colocacion del mapa 
  get isMapReady(){
    return !! this.map;
  }

  //creacion e implementacion de contructor
  constructor(private directionsApi: DirectionsApiClient){}
 
  //llamar el mapa
  setMap( map: Map){
    this.map = map;
  }

  //sirve para poder mover el mapa a cualquier componente sin que pierda estructura 
  flyTo(Marker:any){
    //si el mapa no esta cargado de forma correcta que envie el if para mostrar al usuario que no se cargo correctamente
    if(!this.isMapReady) throw Error('El mapa no esta inicializado');
    //constante de marcadores
    const newMarkers = [];

    this.map?.flyTo({
      zoom: 14,
      center: Marker 
    });
  }

  //mostrar marcadores en el mapa cada que se encuentre una posicion
  createMarkersFromPlaces(places: Feature[], userLocation:[number,number]){


    //si el mapa no se ha cargado correctamente, se enviara una alerta al usuario 
    if ( !this.map) throw Error('Mapa no inicializado, regargue el sisito')

    //cuando el usuario borre la busqueda los marquers se removeran para evitar saturacion en la pantalla 
    this.markers.forEach(marker => marker.remove() );
    const newMarkers = [];

    //metodo form para el manejo de markers en el mapa 
    for( const place of places){
      const [ lng, lat ] = place.center;
      const popup = new Popup()
      .setHTML(`
      <h6>${ place.text }</h6>
      <span>${ place.place_name }</span>
      `);
      //contante para crear nuevos marcadores segun la latitud y longitud de la busqueda realizada por el suaurio 
      const newMarker = new Marker()
      .setLngLat([lng,lat])
      .setPopup( popup )
      .addTo ( this.map );
      newMarkers.push (newMarker);
    }

    
    this.markers = newMarkers;

    //validacion de mapa
    if( places.length === 0 ) return;

    //limites del mapa
    const bounds = new LngLatBounds();
    newMarkers.forEach( marker => bounds.extend(marker.getLngLat() ) );
    bounds.extend(userLocation);
    //mostrar todos los markers del mundo 
    this.map.fitBounds(bounds,{
      padding: 200
    })
  }

  //metodos para uso de contructor 
  getRouteBetweenPoints( start:[number,number], end: [number,number]){

    //llamar el directionApi implementando un metodo get
    this.directionsApi.get<DirectionResponse>(`/${ start.join(',') }; ${ end.join(',')}`)
    .subscribe(resp => this.drawPolyline( resp.routes[0]));

  }

  //propiedad privada 
  private drawPolyline( route: Route){

    //se imprime en consola la distancia que se debe recorrer y la duracion del trayecto 
    console.log({kms: route.distance / 1000, duration: route.duration /60});

    if( !this.map )throw Error('Mapa no inicializado');

    const coords = route.geometry.coordinates;


    const bounds = new LngLatBounds();
    coords.forEach( ([lng,lat]) => {
      bounds.extend([lng,lat]) 
    });

    this.map?.fitBounds( bounds,{
      padding:200
    });


  //creacion del trazo de rutas
  //PlyLine
  const sourceData: AnySourceData ={
    type: 'geojson',
    data:{
      type: 'FeatureCollection',
      features:[
        {
          type: 'Feature',
          properties:{},
          geometry:{
            type: 'LineString',
            coordinates: coords
          }
        }
      ]
    }
  }

  //todo: limpiar ruta previa
  if( this.map.getLayer('RouteString')){
    this.map.removeLayer('RouteString');
    this.map.removeSource('RouteString');
  }

  this.map.addSource('RouteString', sourceData);

  this.map.addLayer({
    id:'RouteString',
    type: 'line',
    source: 'RouteString',
    layout:{
      'line-cap': 'round',
      "line-join": 'round'
    },
    paint:{
      'line-color': 'black',
      'line-width': 3
    }
  });
}

}
