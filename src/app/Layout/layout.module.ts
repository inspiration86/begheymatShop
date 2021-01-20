import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { IndexComponent } from './index/index.component';
import {SliderComponent} from './slider/slider.component';
import {NewProductsComponent} from './new-products/new-products.component';
import {AllProductsComponent} from './all-products/all-products.component';
import {CommentsUserComponent} from './comments-user/comments-user.component';
import {SharedmoduleModule} from '../SharedModule/sharedmodule.module';
import {RippleModule} from 'primeng/ripple';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {SharedcomponentModule} from '../SharedComponent/sharedcomponent.module';
import { CartComponent } from './cart/cart.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { FeatureComponent } from './feature/feature.component';
import { DiscountComponent } from './discount/discount.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import { BestSellingComponent } from './best-selling/best-selling.component';
import { BannerComponent } from './banner/banner.component';
import { OffersComponent } from './offers/offers.component';
import { GiftComponent } from './gift/gift.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {HomeFeatureComponent} from './home-feature/home-feature.component';

import {ProductsComponent} from './products/products.component';
import {FaqComponent} from './faq/faq.component';
import {AboutComponent} from './about/about.component';
import {HomeHottestComponent} from './home-hottest/home-hottest.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {Ng5SliderModule} from 'ng5-slider';
import {GalleriaModule} from 'primeng/galleria';
import {CallBackComponent} from './call-back/call-back.component';
import {CooperatorsComponent} from './cooperators/cooperators.component';
import { MatSelectModule } from '@angular/material/select';
import { SidebarModule } from 'primeng/sidebar';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import {SelectButtonModule} from 'primeng/selectbutton';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import {OrderListModule} from 'primeng/orderlist';
import {JwPaginationModule} from 'jw-angular-pagination';
import {NgxSpinnerModule} from 'ngx-spinner';

import { ResultSearchComponent } from './result-search/result-search.component';

import {HomePopularCategoryComponent} from './home-popular-category/home-popular-category.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import {MatRadioModule} from '@angular/material/radio';
import { PaymentHelpComponent } from './payment-help/payment-help.component';
import {TimelineModule} from 'primeng/timeline';
import {NgImageFullscreenViewModule} from 'ng-image-fullscreen-view';
import {NgOtpInputModule} from "ng-otp-input";

@NgModule({
  declarations: [IndexComponent,
    SliderComponent,
    NewProductsComponent,
    AllProductsComponent,
    CommentsUserComponent,
    CartComponent,
    FeatureComponent,
    DiscountComponent,
    BestSellingComponent,
    BannerComponent,
    GiftComponent,
    SubscriptionComponent,
    ProductDetailComponent,
    ProductsComponent,
    FaqComponent,
    HomeHottestComponent,
    HomeFeatureComponent,
    CooperatorsComponent,
    AboutComponent,
    CallBackComponent,
    LoginRegisterComponent,
    WishlistComponent,
    OffersComponent,
    ResultSearchComponent,
    HomePopularCategoryComponent,
    OffersComponent,
    PaymentHelpComponent,

  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedmoduleModule,
    SharedcomponentModule,
    ReactiveFormsModule,
    RippleModule,
    CarouselModule,
    FormsModule,
    MatListModule,
    MatSelectModule,
    MatIconModule,
    MatStepperModule,
    MatCardModule,
    MatTableModule,
    CarouselModule,
    MatExpansionModule,
    Ng5SliderModule,
    GalleriaModule,
    SidebarModule,
    InputSwitchModule,
    SelectButtonModule,
    NgxImageZoomModule,
    OrderListModule,
    JwPaginationModule,
    NgxSpinnerModule,
    PanelMenuModule,
    MatRadioModule,
    TimelineModule,
    NgImageFullscreenViewModule,
    NgOtpInputModule
  ],
  exports: [
    IndexComponent,
    SliderComponent,
    NewProductsComponent,
    AllProductsComponent,
    CommentsUserComponent,
    ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class LayoutModule { }
