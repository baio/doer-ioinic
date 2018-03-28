import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgxFormModule, PagesModule } from '../../libs/doer-ionic-core';
import { RegisterOrgPageComponent } from './register-org';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  FormService as RegitserOrgFormService,
  formReducer as regitserOrgFormReducer,
  FormEffects as  RegitserOrgFormEffects
} from './register-org';
import { HttpService, HTTP_CONFIG } from '../../libs/doer-ngx-core';
import { RegisterOrgCompletePageModule } from './register-org-complete/register-org-complete-page/register-org-complete-page.component.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HttpModule,
    NgxFormModule,
    PagesModule,
    EffectsModule.forFeature([RegitserOrgFormEffects]),
    StoreModule.forFeature('registerOrgForm', regitserOrgFormReducer),
    RegisterOrgCompletePageModule
  ],
  declarations: [
    RegisterOrgPageComponent
  ],
  exports: [
    RegisterOrgPageComponent
  ],
  providers: [
    { provide: HTTP_CONFIG, useValue: { baseUrl: 'http://localhost:7071/api/' } },
    HttpService,
    RegitserOrgFormService,
  ],
  entryComponents: [
  ]
})
export class DoerUserModule {}
