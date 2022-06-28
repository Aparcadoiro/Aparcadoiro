import { Injectable } from '@angular/core';

import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Injectable({
    providedIn: 'root'
  })

export class LatlongService {

    private contactCollection:AngularFirestoreCollection<any>;

    constructor(afs: AngularFirestore){
        this.contactCollection = afs.collection<any>('contacts');
    }

    saveMessage(Parqueaderos:any):void{
        this.contactCollection.add(Parqueaderos)
    }
}