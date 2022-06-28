//importaciones de angular 
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

//Importaciones para el manejo de rutas 
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule),
     canActivate:[AuthGuard]
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'parqueaderos',
    loadChildren: () => import('./parqueaderos/parqueaderos.module').then( m => m.ParqueaderosPageModule),
  },
  {
    path: 'add-parqueadero',
    loadChildren: () => import('./add-parqueadero/add-parqueadero.module').then( m => m.AddParqueaderoPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'perfil-user',
    loadChildren: () => import('./perfil-user/perfil-user.module').then( m => m.PerfilUserPageModule),
    canActivate:[AuthGuard]
  },
  {
  path: 'map-box',
    loadChildren: () => import('./components/map-box/map-box.module').then( m => m.MapBoxPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'reservas',
    loadChildren: () => import('./reservas/reservas.module').then( m => m.ReservasPageModule)
  },
  {
    path: 'add-reserva',
    loadChildren: () => import('./add-reserva/add-reserva.module').then( m => m.AddReservaPageModule)
  },
  {
    path: 'detail-reserva',
    loadChildren: () => import('./detail-reserva/detail-reserva.module').then( m => m.DetailReservaPageModule)
  },
  {
    path: 'pagar-reserva',
    loadChildren: () => import('./pagar-reserva/pagar-reserva.module').then( m => m.PagarReservaPageModule)
  },
  {
    path: 'detail-reserva-parq',
    loadChildren: () => import('./detail-reserva-parq/detail-reserva-parq.module').then( m => m.DetailReservaParqPageModule)
  },
  {
    path: 'parqueaderos-reservas',
    loadChildren: () => import('./parqueaderos-reservas/parqueaderos-reservas.module').then( m => m.ParqueaderosReservasPageModule)
  },
  {
    path: 'pagar-reserva-parqueadero',
    loadChildren: () => import('./pagar-reserva-parqueadero/pagar-reserva-parqueadero.module').then( m => m.PagarReservaParqueaderoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
