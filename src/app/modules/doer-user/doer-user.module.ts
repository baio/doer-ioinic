import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFormModule } from '../../libs/doer-ionic-core';
import { RegisterOrgPageComponent } from './register-org';
import { IonicModule } from 'ionic-angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NgxFormModule
  ],
  declarations: [
    RegisterOrgPageComponent
  ],
  exports: [
    RegisterOrgPageComponent
  ],
  providers: [
  ],
  entryComponents: [
  ]
})
export class DoerUserModule {}
