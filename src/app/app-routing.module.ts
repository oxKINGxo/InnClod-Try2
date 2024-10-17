import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {
    path:'dashboard', canActivate:[AuthGuard], 
    loadComponent: () => 
      import('./vistas/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent)
  },
  {
    path:'dashboardT/:id', canActivate:[AuthGuard], 
    loadComponent: () => 
      import('./vistaT/dashboardt/dashboardt.component').then(
        (c) => c.DashboardtComponent)
  },
  {
    path:'**', 
    loadComponent: () => 
      import('./vistas/not-found/not-found.component').then(
        (c) => c.NotFoundComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent]
