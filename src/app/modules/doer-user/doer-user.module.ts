import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFormModule, PagesModule } from '../../libs/doer-ionic-core';
import { RegisterOrgPageComponent } from './register-org';
import { IonicModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  FormService as RegitserOrgFormService,
  formReducer as regitserOrgFormReducer,
  FormEffects as  RegitserOrgFormEffects
} from './register-org';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NgxFormModule,
    PagesModule,
    EffectsModule.forFeature([RegitserOrgFormEffects]),
    StoreModule.forFeature('registerOrgForm', regitserOrgFormReducer),
  ],
  declarations: [
    RegisterOrgPageComponent
  ],
  exports: [
    RegisterOrgPageComponent
  ],
  providers: [
    RegitserOrgFormService
  ],
  entryComponents: [
  ]
})
export class DoerUserModule {}
