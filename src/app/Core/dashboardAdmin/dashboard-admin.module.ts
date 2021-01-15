import {AdminCategoriesComponent} from './admin-categories/admin-categories.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardAdminRoutingModule} from './dashboard-admin-routing.module';
import {IndexComponent} from './index/index.component';
import {SharedmoduleModule} from '../../SharedModule/sharedmodule.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HomepageComponent} from './homepage/homepage.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {AdviceAnswerDialogComponent} from './admin-advices/advice-answer-dialog/advice-answer-dialog.component';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {AddSliderDialogComponent} from './homepage/add-slider-dialog/add-slider-dialog.component';
import {EditSliderDialogComponent} from './homepage/edit-slider-dialog/edit-slider-dialog.component';
import {AdminProductsComponent} from './admin-products/admin-products.component';
import {AdminAddProductComponent} from './admin-products/admin-add-product/admin-add-product.component';
import {AdminEditProductComponent} from './admin-products/admin-edit-product/admin-edit-product.component';
import {CategoryEditDialogComponent} from './admin-categories/category-edit-dialog/category-edit-dialog.component';
import {CategoryAddDialogComponent} from './admin-categories/category-add-dialog/category-add-dialog.component';
import {SubCategoryAddDialogComponent} from './admin-categories/sub-category-add-dialog/sub-category-add-dialog.component';
import {SubSubCategoryAddDialogComponent} from './admin-categories/sub-sub-category-add-dialog/sub-sub-category-add-dialog.component';
import {SubCategoryEditDialogComponent} from './admin-categories/sub-category-edit-dialog/sub-category-edit-dialog.component';
import {SubSubCategoryEditDialogComponent} from './admin-categories/sub-sub-category-edit-dialog/sub-sub-category-edit-dialog.component';
import {AdminFeaturesComponent} from './admin-features/admin-features.component';
import {FeatureAddDialogComponent} from './admin-features/feature-add-dialog/feature-add-dialog.component';
import {FeatureValueAddDialogComponent} from './admin-features/feature-value-add-dialog/feature-value-add-dialog.component';
import {FeatureEditDialogComponent} from './admin-features/feature-edit-dialog/feature-edit-dialog.component';
import {FeatureValueEditDialogComponent} from './admin-features/feature-value-edit-dialog/feature-value-edit-dialog.component';
import {AdminSellersComponent} from './admin-sellers/admin-sellers.component';
import {AdminCommentsComponent} from './admin-comments/admin-comments.component';
import {AdminAdvicesComponent} from './admin-advices/admin-advices.component';
import {AdminAddSellerComponent} from './admin-sellers/admin-add-seller/admin-add-seller.component';
import {AdminEditSellerComponent} from './admin-sellers/admin-edit-seller/admin-edit-seller.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {InputMaskModule} from 'primeng/inputmask';
import {AdminUsersComponent} from './admin-users/admin-users.component';
import {AdminAddUserComponent} from './admin-users/admin-add-user/admin-add-user.component';
import {AdminEditUserComponent} from './admin-users/admin-edit-user/admin-edit-user.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { SellerDetailDialogComponent } from './admin-sellers/seller-detail-dialog/seller-detail-dialog.component';
import {EditorModule} from 'primeng/editor';
import { AdminNotificationsComponent } from './admin-notifications/admin-notifications.component';
import { NotificationAddDialogComponent } from './admin-notifications/notification-add-dialog/notification-add-dialog.component';
import { NotificationEditDialogComponent } from './admin-notifications/notification-edit-dialog/notification-edit-dialog.component';
import { NotificationDetailDialogComponent } from './admin-notifications/notification-detail-dialog/notification-detail-dialog.component';

@NgModule({
  declarations: [
    IndexComponent,
    HomepageComponent,
    AdviceAnswerDialogComponent,
    AddSliderDialogComponent,
    EditSliderDialogComponent,
    AdminProductsComponent,
    AdminAddProductComponent,
    AdminEditProductComponent,
    AdminCategoriesComponent,
    CategoryEditDialogComponent,
    CategoryAddDialogComponent,
    SubCategoryAddDialogComponent,
    SubSubCategoryAddDialogComponent,
    SubCategoryEditDialogComponent,
    SubSubCategoryEditDialogComponent,
    AdminFeaturesComponent,
    FeatureAddDialogComponent,
    FeatureValueAddDialogComponent,
    FeatureEditDialogComponent,
    FeatureValueEditDialogComponent,
    AdminSellersComponent,
    AdminCommentsComponent,
    AdminAdvicesComponent,
    AdminAddSellerComponent,
    AdminEditSellerComponent,
    AdminUsersComponent,
    AdminAddUserComponent,
    AdminEditUserComponent,
    AdminLoginComponent,
    SellerDetailDialogComponent,
    AdminNotificationsComponent,
    NotificationAddDialogComponent,
    NotificationEditDialogComponent,
    NotificationDetailDialogComponent
  ],
    imports: [
        CommonModule,
        DashboardAdminRoutingModule,
        SharedmoduleModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        DynamicDialogModule,
        InputSwitchModule,
        MatStepperModule,
        MatRadioModule,
        InputMaskModule,
        EditorModule
    ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [
    AdviceAnswerDialogComponent,
    AddSliderDialogComponent,
    EditSliderDialogComponent,
    CategoryEditDialogComponent,
    CategoryAddDialogComponent,
    SubCategoryAddDialogComponent,
    SubSubCategoryAddDialogComponent,
    SubCategoryEditDialogComponent,
    SubSubCategoryEditDialogComponent,
    FeatureAddDialogComponent,
    FeatureValueAddDialogComponent,
    FeatureEditDialogComponent,
    FeatureValueEditDialogComponent,
    SellerDetailDialogComponent,
    NotificationAddDialogComponent,
    NotificationEditDialogComponent,
    NotificationDetailDialogComponent
  ]
})
export class DashboardAdminModule {
}
