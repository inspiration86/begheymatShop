import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './register/register.component';
import {SharedcomponentModule} from "../SharedComponent/sharedcomponent.module";
import {SharedmoduleModule} from "../SharedModule/sharedmodule.module";
import {MatCardModule} from "@angular/material/card";
import {NgOtpInputModule} from "ng-otp-input";
import {SellerLoginComponent} from './seller/seller-login/seller-login.component';
import {SellerRegisterComponent} from './seller/seller-register/seller-register.component';
import {MatStepperModule} from '@angular/material/stepper';


@NgModule({
  declarations: [RegisterComponent,SellerLoginComponent,SellerRegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedcomponentModule,
    SharedmoduleModule,

    MatCardModule,
    NgOtpInputModule,
    MatStepperModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AuthModule { }
