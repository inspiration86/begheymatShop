import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardUserRoutingModule } from './dashboard-user-routing.module';
import { IndexComponent } from './index/index.component';
import {SharedmoduleModule} from '../../SharedModule/sharedmodule.module';
import {SharedcomponentModule} from "../../SharedComponent/sharedcomponent.module";
import { ProfileComponent } from './profile/profile.component';
import {ReactiveFormsModule} from "@angular/forms";
import { PurchasesComponent } from './purchases/purchases.component';
import { PaymentUserComponent } from './payment-user/payment-user.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
@NgModule({
  declarations: [IndexComponent, ProfileComponent, PurchasesComponent, PaymentUserComponent],
  imports: [
    CommonModule,
    DashboardUserRoutingModule,
    SharedmoduleModule,
    SharedcomponentModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,


  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class DashboardUserModule { }
