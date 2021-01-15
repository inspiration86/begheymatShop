import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {ProfileComponent} from './profile/profile.component';
import {ProductSellerComponent} from './product-seller/product-seller.component';
import {FeatureComponent} from './feature/feature.component';
import {EditProductComponent} from './product-seller/edit-product/edit-product.component';
import { AdviceComponent } from './advice/advice.component';
import {AddProductComponent} from './product-seller/add-product/add-product.component';
import {PurchasesComponent} from './purchasesSeller/purchases.component';
import {NotificationComponent} from './notification/notification.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,

  },
  {
    path: '',

    component: IndexComponent,
    children: [{
      path: 'notification',
      component: NotificationComponent
    }],
  },
  {
    path: '',

    component: IndexComponent,
    children: [{
      path: 'profile',
      component: ProfileComponent
    }],
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'product',
      component: ProductSellerComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'product/add',
      component: AddProductComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'product/edit/:id',
      component: EditProductComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'feature',
      component: FeatureComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'advice',
      component: AdviceComponent
    }]
  },
  {
    path: '',
    component: IndexComponent,
    children: [{
      path: 'purchases',
      component: PurchasesComponent
    }]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardSellerRoutingModule {
}
