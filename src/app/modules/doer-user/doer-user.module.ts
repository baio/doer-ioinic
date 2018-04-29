import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgxFormModule, PagesModule } from '../../libs/doer-ionic-core';
import { IonicModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  FormService as RegitserOrgFormService,
  formReducer as regitserOrgFormReducer,
  FormEffects as  RegitserOrgFormEffects
} from './register-org';
import { HttpService, HTTP_CONFIG } from '../../libs/doer-ngx-core';


import { HomePageComponent } from './home-page/home-page.component';
import { RegisterOrgCompletePageModule } from './register-org-complete/register-org-complete-page/register-org-complete-page.component.module';
import { RegisterOrgPageModule } from './register-org/register-org-page/register-org-page.component.module';
import { HomePageModule } from './home-page/home-page.component.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HttpModule,
    PagesModule,
    EffectsModule.forFeature([RegitserOrgFormEffects]),
    StoreModule.forFeature('registerOrgForm', regitserOrgFormReducer),
    RegisterOrgCompletePageModule,
    RegisterOrgPageModule,
    HomePageModule
  ],
  declarations: [
    //HomePageComponent
  ],
  exports: [
    //HomePageComponent
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
