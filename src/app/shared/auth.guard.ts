//Importaciones de Angular y Ionic para el uso de interfaces, rutas y funciones
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';

@Injectable({
  providedIn: 'root'
})

//Funcion para exportar la clase AuthGuard
export class AuthGuard implements CanActivate {

  //Funcion constructor para definir variables de autenticacion, servicios y rutas
  constructor(private authSvc:AuthService, private router: Router, private modalCtrl: ModalController){}

  //Funcion para abrir el modal de inicio de sesion
  async openLoginModal(){
    const modalLogin = await this.modalCtrl.create({
      component: LoginPage,
    });
    await modalLogin.present();
    }

  //Funcion para la verificacion de usuarios y activar o desactivar rutas
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authSvc.user$.pipe(
          take(1),
          map(user => {
            console.log('user->', user);
            if (user){
              return true;
            }else{
              //redirectToLoginPage
              this.router.navigate(['/home']);
              this.openLoginModal();
              return false;
            }
          })
        )
      }
}
  
