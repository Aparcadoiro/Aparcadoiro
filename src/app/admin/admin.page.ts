//importacion del nucleo de angular
import { Component, OnInit } from '@angular/core';
//importacion de la ruta angular
import { Router } from '@angular/router';
//importacion de observable
import { Observable } from 'rxjs';
//importacion de auth service de los servicios creados 
import { AuthService } from '../service/auth.service';
//importacion de la interfaz de angular 
import { User } from '../shared/user.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
//exportacion de la clase admin page 
export class AdminPage implements OnInit {
  //variable publica de user Observalbe 
  public user$: Observable<User> = this.authSvc.afAuth.user;

  //contructor publico de authSVC y privado de router:Router
  constructor(public authSvc: AuthService, private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  //sistema para cerrar sesion del apartado de admin 
  async onLogout() {
    try {
      await this.authSvc.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }

}
