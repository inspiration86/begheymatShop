import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {SellerLoginComponent} from './seller/seller-login/seller-login.component';
import {SellerRegisterComponent} from './seller/seller-register/seller-register.component';


const routes: Routes = [
  {
    path:'login',
    component:SellerLoginComponent
  },
  {
    path:'register',
    component:SellerRegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
