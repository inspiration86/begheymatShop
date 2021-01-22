import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {TopMenuComponent} from './top-menu/top-menu.component';
import {SharedmoduleModule} from '../SharedModule/sharedmodule.module';
import {ReactiveFormsModule} from '@angular/forms';
import {PanelMenuModule} from 'primeng/panelmenu';
import {HeaderComponent} from './header/header.component';
import {TopHeaderComponent} from './header/top-header/top-header.component';
import {MiddleHeaderComponent} from './header/middle-header/middle-header.component';
import {NavHeaderComponent} from './header/nav-header/nav-header.component';
import {MobileHeaderComponent} from './header/mobile-header/mobile-header.component';
// import {ClickOutsideModule} from 'ng-click-outside';
import {Ng5SliderModule} from 'ng5-slider';

import { SearchBarComponent } from './header/search-bar/search-bar.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {InputSwitchModule} from 'primeng/inputswitch';


@NgModule({
  // providers: [FooterComponent],
  declarations: [
    FooterComponent, TopMenuComponent, HeaderComponent, TopHeaderComponent, MiddleHeaderComponent, NavHeaderComponent, MobileHeaderComponent, SearchBarComponent
  ],
  imports: [
    CommonModule,
    SharedmoduleModule,
    ReactiveFormsModule,
    PanelMenuModule,
    // ClickOutsideModule,
    Ng5SliderModule,
    MatChipsModule,
    MatAutocompleteModule,
    InputSwitchModule,

  ],
  exports: [
    FooterComponent, TopMenuComponent, HeaderComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SharedcomponentModule {
}
