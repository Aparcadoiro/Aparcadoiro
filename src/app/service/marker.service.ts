import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { markers } from "../parqueaderos/markersparq.model";
import { latlong } from "../shared/latlong.interface";


@Injectable({
    providedIn:"root"
})

export class Marquermap{
    constructor(private firebase: AngularFirestore,private afs:AngularFirestore){

    }

    guardarMarquer(markerpar: markers): Promise<any>{
      return  this.firebase.collection('Parqueaderos').add('Parqueaderos');
    }

    private updateMarkerData(marker: latlong){
        const marRef: AngularFirestoreDocument<latlong> = this.afs.doc(`Parqueaderos/${marker.latitud},${marker.longitud}`)
        const data: latlong ={
          latitud: marker.latitud,
          longitud: marker.longitud
        };
        return marRef.set(data, {merge:true})
      }
}