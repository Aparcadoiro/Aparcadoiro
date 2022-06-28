import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AddParqueaderoPage } from '../add-parqueadero/add-parqueadero.page';
import { DetailComponent } from '../detail/detail.page';
import { ParqueaderosService } from '../service/parqueaderos.service';
import { Parqueadero } from './parqueaderos.model';
import { User } from '../shared/user.interface';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-parqueaderos',
  templateUrl: './parqueaderos.page.html',
  styleUrls: ['./parqueaderos.page.scss'],
})
export class ParqueaderosPage implements OnInit {

  public user$: Observable<User> = this.authSvc.afAuth.user;
  parqueaderos$: Observable<Parqueadero[]>;

  constructor(
    public authSvc: AuthService,
    private parqueaderosService: ParqueaderosService, 
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
    ){}

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({message: 'Cargando...'})
    loading.present();

    this.cargarParqueaderos();

    this.parqueaderosService.listenSocket("parking").subscribe(
      response => {
        console.log(response)
        this.cargarParqueaderos()}
    );

    loading.dismiss();

  }

  cargarParqueaderos(){
    this.parqueaderos$ = this.parqueaderosService.getParqueaderos().pipe(
      tap((parqueaderos) => {
        
        return parqueaderos;
      })
    );
  }

  async openAddParqueaderoModal(){
    const modalRegister = await this.modalCtrl.create({
      component: AddParqueaderoPage,
    });
    
    await modalRegister.present();

    }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async openDetailModal(parqueadero: Parqueadero) {
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: { parqueadero },
    });
    
    await modal.present();

    const { data: updatedParqueadero } = await modal.onDidDismiss();
    if (updatedParqueadero) {
      this.parqueaderos$ = this.parqueaderos$.pipe(
        map(parqueaderos => {
          parqueaderos.forEach(parq => {
            if(parq.id == updatedParqueadero.id){
              parq = updatedParqueadero;
            }
            return parq;
          });
          return parqueaderos;
        })
      );
    }
  }
}
