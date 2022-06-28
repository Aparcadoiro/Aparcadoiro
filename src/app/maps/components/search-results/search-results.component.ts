import { Component } from '@angular/core';
import { Feature } from '../../interfaces/places';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent  {

  //propiedad para dejar marcado la ubicacion que seleccione el usuario
  public selectedId: string ='';

  constructor( 
    //importacion del PlaceService para ejecutar metodos get
    private placeService: PlacesService,
    //Importacion del MapService para el manejo de latitud y longitude de las busquedas
    private mapService: MapService,
    ) { }

}
