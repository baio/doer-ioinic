import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DoerUserModule } from './modules/doer-user';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgrxConstants, AuthService, AUTH_SERVICE_CONFIG, Auth0ImplicitService,
  authReducer, AuthEffects, ToastrService } from '@doer/ngx-core';
import { Auth0ROPGService, RouterEffects } from '@doer/ionic-core';
import { TakePhotoModule, StorageModule, StorageService } from '@doer/native';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*
const auth0Config = {
  // Needed for Auth0 (capitalization: ID):
  clientID: 'QTVsqmat06hTQQeavpR2j7SUuBijI2Lm',
  domain: 'doer-stage.eu.auth0.com',
  redirectUri: 'http://doer-local:8100',
  responseType: 'token id_token',
  scope: 'openid profile',
  jwks: {
    exp: '010001',
    modulus: 'e28d34a0d37ce72681dcf056fbda092b48eadea6518554cb3c0f994018e37f9c586d514e024a04d5e93cd5e3778ef26032e81c5b339854abe1ee4b6787280e02133f9865f677bb26a4336d8bd0071ae1fe6aa1f5aeec7560e4891479b7b6903f1aea60f55487289c15ae6e2071a7f413c44f5f638664a51c4c984234811f73ea7a4d2b0ff4819c6ac62d2cb4258e14453bce182c010b4eca7706bc9be6337824bad17911411416777b3d012101d4d4293b7c80476774c9085a2d93a1601b788dbe65f7a2667f9b097d5e6fe580ee2c87368bb6ad442484b00246d295384c6b8ff95e10819eb69c930d4709aae93b1a7d3e4de032226b1bd30eb4c90507752f2f'
  }
};
*/


const auth0Config = {
  clientID: '5Svk7WPecVbRE165tCEYNWITRbVsIXE4',
  domain: 'baio.auth0.com',
  redirectUri: 'http://doer-local:8100',
  responseType: 'token id_token',
  scope: 'openid profile',
  jwks: {
    modulus: "b2a13309431ab4f37a42a37ce1b85c4e752657af608e41b07865f6ba5c900cfc4eed0422ca673092a5c998cabc88603d69b1b8740f5b6037f964c41b31faf720d12080fc74069fca87924e0bdc73d6b3c86dd97203a996949d8470f73210eef353fde61fd39974557acfd5c493a89a818a688bf7785340e663507e448d559e08cdc6c803cb863000060c2b1d0573e50b196a4be454e9092528fe5e2886e43de7ac6e3e427a44b6dd020c045e9470c51e45302aa398496b26ed2e352cd4f782abf07d34088b0d1a637dcb48d7e2519fd167bb19c4b9150cfa97a89e52a77d1086ef88f88b2ea13cdafdad24512f5971d0aa4888f2505e63c8017512010905bf33",
    exp: "010001"
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    StoreModule.forRoot(NgrxConstants.REDUCERS),
    EffectsModule.forRoot([RouterEffects, AuthEffects]),
    StoreDevtoolsModule.instrument(),
    TakePhotoModule.forRoot(),
    StorageModule.forRoot(),
    DoerUserModule,
    //
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StorageService,
    ToastrService,
    {provide: AUTH_SERVICE_CONFIG, useValue: auth0Config },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: AuthService, useClass: Auth0ROPGService}
  ]
})
export class AppModule {}
