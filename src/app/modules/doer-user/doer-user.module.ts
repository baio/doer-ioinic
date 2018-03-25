import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFormModule, PagesModule } from '../../libs/doer-ionic-core';
import { RegisterOrgPageComponent } from './register-org';
import { IonicModule } from 'ionic-angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NgxFormModule,
    PagesModule
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
