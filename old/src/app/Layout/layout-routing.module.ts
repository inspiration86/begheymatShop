import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './index/index.component';
import {CartComponent} from './cart/cart.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {AboutComponent} from './about/about.component';
import {FaqComponent} from './faq/faq.component';
import {ProductsComponent} from './products/products.component';
import {CallBackComponent} from './call-back/call-back.component';
import {LoginRegisterComponent} from './login-register/login-register.component';
import {WishlistComponent} from './wishlist/wishlist.component';
import {ResultSearchComponent} from "./result-search/result-search.component";
import {PaymentHelpComponent} from './payment-help/payment-help.component';
const routes: Routes = [
  {
    path: '' ,
    component: IndexComponent
  },
  {
    path: 'cart',
    component:  CartComponent
  },
  {
    path: 'product/:cat/:sub/:sub2',
    component:  ProductsComponent
  },
  {
    path: 'detail/:id',
    component:  ProductDetailComponent
  },
  {
    path: 'faq',
    component:  FaqComponent
  },
  {
    path: 'about',
    component:  AboutComponent
  },
  {
    path: 'help',
    component:  PaymentHelpComponent
  },
  {
    path: 'call-back/:success',
    component:  CallBackComponent
  },
  {
    path: 'account',
    component:  LoginRegisterComponent
  },
  {
    path: 'wishlist',
    component:  WishlistComponent
  },
  {
    path: 'resultSearch',
    component:  ResultSearchComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
