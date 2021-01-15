import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimNgComponentModule} from './prim-ng-component.module';
import {MatrialComponentModule} from './matrial-component.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrimNgComponentModule,
    MatrialComponentModule
  ],
  exports:[PrimNgComponentModule,MatrialComponentModule]
})
export class SharedmoduleModule { }
