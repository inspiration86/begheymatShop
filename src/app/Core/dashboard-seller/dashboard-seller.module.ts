import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardSellerRoutingModule} from './dashboard-seller-routing.module';
import {SharedmoduleModule} from '../../SharedModule/sharedmodule.module';
import {SharedcomponentModule} from '../../SharedComponent/sharedcomponent.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IndexComponent} from './index/index.component';
import {ProfileComponent} from './profile/profile.component';
import {DropdownModule} from 'primeng/dropdown';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {ProductSellerComponent} from './product-seller/product-seller.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import {FeatureComponent} from './feature/feature.component';
import {AddFeatureDialogComponent} from './feature/add-feature-dialog/add-feature-dialog.component';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {AddFeatureValueDialogComponent} from './feature/add-feature-value-dialog/add-feature-value-dialog.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {EditProductComponent} from './product-seller/edit-product/edit-product.component';
import {ListboxModule} from 'primeng/listbox';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import {InputMaskModule} from 'primeng/inputmask';
import { AdviceComponent } from './advice/advice.component';
import { AddAdviceAnswerDialogComponent } from './advice/add-advice-answer-dialog/add-advice-answer-dialog.component';
import { AddProductComponent } from './product-seller/add-product/add-product.component';
import {PurchasesComponent} from './purchasesSeller/purchases.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [
    IndexComponent,
    ProfileComponent,
    ProductSellerComponent,
    FeatureComponent,
    AddFeatureDialogComponent,
    AddFeatureValueDialogComponent,
    EditProductComponent,
    AdviceComponent,
    AddAdviceAnswerDialogComponent,
    AddProductComponent,
    PurchasesComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    DashboardSellerRoutingModule,
    SharedmoduleModule,
    SharedcomponentModule,
    ReactiveFormsModule,
    DropdownModule,
    FormsModule,
    MatStepperModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    InputSwitchModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    ListboxModule,
    DpDatePickerModule,
    InputMaskModule,
    ProgressSpinnerModule,

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [
    AddFeatureDialogComponent,
    AddFeatureValueDialogComponent,
    AddAdviceAnswerDialogComponent
  ]
})
export class DashboardSellerModule {
}
