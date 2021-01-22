import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserGuard} from "./Auth/Guards/user.guard";
import {AccesslevelGuard} from "./Auth/Guards/accesslevel.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'},
  {
    path: 'home',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
    data: { title: 'home', breadcrumb: 'home'}
  },
  {
    path: 'home',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./Auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'sellerBe',
    loadChildren: () => import('./layout/seller/seller.module').then(m => m.SellerModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./Core/dashboard-user/dashboard-user.module').then(m => m.DashboardUserModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./Core/dashboardAdmin/dashboard-admin.module').then(m => m.DashboardAdminModule),
  },
  {
    path: 'seller',
    loadChildren: () => import('./Core/dashboard-seller/dashboard-seller.module').then(m => m.DashboardSellerModule),
    canActivate:[UserGuard,AccesslevelGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, initialNavigation: 'enabled', scrollPositionRestoration:'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
