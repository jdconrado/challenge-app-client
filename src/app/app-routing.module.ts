import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserProductsComponent } from './pages/user-products/user-products.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductComponent } from './pages/product/product.component';
import { AuthGuard } from './guards/auth.guard';
import { AlreadyLoggedGuard } from './guards/already-logged.guard';

const routes: Routes = [
  {path:'login', component: LoginComponent, canActivate: [AlreadyLoggedGuard]},
  {path:'sign-up', component: SignUpComponent, canActivate:[AlreadyLoggedGuard]},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'not-found', component: NotFoundComponent},
  {path:'my-products', component: UserProductsComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'product/:id', component: ProductComponent, canActivate:[AuthGuard]},
  {path:'', component: HomeComponent, canActivate:[AlreadyLoggedGuard]},
  {path:'**', redirectTo:'/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
