import { Component} from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent  {

  /*funcion de js para  especificar el período de tiempo que se debe 
  *esperar una respuesta de servicio web al invocar una solicitud de salida
  */
  private debounceTimer?: NodeJS.Timeout;

  constructor(private placeService: PlacesService) { }

}
