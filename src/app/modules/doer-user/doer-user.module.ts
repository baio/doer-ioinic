import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { PagesModule } from '@doer/ionic-core';
import { IonicModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HttpService, HTTP_CONFIG } from '@doer/ngx-core';
import { CameraService, UploadFileService } from '@doer/native';

import {
  FormService as RegitserOrgFormService,
  formReducer as regitserOrgFormReducer,
  FormEffects as RegitserOrgFormEffects
} from './register-org';

import {
  FormService as LoginFormService,
  formReducer as loginFormReducer,
  FormEffects as LoginFormEffects
} from './login';

import {
  FormService as CreateWorkerFormService,
  formReducer as createWorkerFormReducer,
  FormEffects as CreateWorkerFormEffects
} from './create-worker';


//import { HomePageComponent } from './home-page/home-page.component';
import { RegisterOrgCompletePageModule } from './register-org-complete/register-org-complete-page/register-org-complete-page.component.module';
import { RegisterOrgPageModule } from './register-org/register-org-page/register-org-page.component.module';
import { HomePageModule } from './home-page/home-page.component.module';
import { LoginPageModule } from './login/login-page/login-page.component.module';
import { ProfilePageModule } from './profile-page/profile-page.component.module';
import { AuthorizingPageComponent } from './authorizing-page/authorizing-page.component';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Transfer } from '@ionic-native/transfer';
import { CreateWorkerPageModule } from './create-worker/create-worker-page/create-worker-page.component.module';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    IonicModule,
    HttpModule,
    PagesModule,
    EffectsModule.forFeature([
      RegitserOrgFormEffects, LoginFormEffects, CreateWorkerFormEffects
    ]),
    StoreModule.forFeature('registerOrgForm', regitserOrgFormReducer),
    StoreModule.forFeature('createWorkerForm', createWorkerFormReducer),
    StoreModule.forFeature('loginForm', loginFormReducer),
    RegisterOrgCompletePageModule,
    RegisterOrgPageModule,
    LoginPageModule,
    ProfilePageModule,
    CreateWorkerPageModule,
    HomePageModule
  ],
  declarations: [
    //HomePageComponent
    AuthorizingPageComponent
  ],
  exports: [
    //HomePageComponent
    AuthorizingPageComponent
  ],
  providers: [
    {
      provide: HTTP_CONFIG,
      useValue: {
        baseUrl:
          /*'http://192.168.0.100:777/api/',*/ 'https://doer-stage.azurewebsites.net/api/'
      }
    },
    HttpService,
    RegitserOrgFormService,
    LoginFormService,
    CreateWorkerFormService,
    // TODO: CameraModule
    Camera,
    File,
    FilePath,
    Transfer,
    CameraService,
    UploadFileService
  ],
  entryComponents: [AuthorizingPageComponent]
})
export class DoerUserModule {}
