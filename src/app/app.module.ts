import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HTTP } from '@ionic-native/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DoerUserModule } from './modules/doer-user';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterEffects } from './libs/doer-ionic-core';
import { NgrxConstants, AuthService, AUTH_SERVICE_CONFIG, Auth0ImplicitService, authReducer, AuthEffects } from './libs/doer-ngx-core';
import { Auth0ROPGService } from './libs/doer-ionic-core/auth/auth0-ropg.service';


/*
const auth0Config = {
  // Needed for Auth0 (capitalization: ID):
  clientID: 'QTVsqmat06hTQQeavpR2j7SUuBijI2Lm',
  // Needed for Auth0Cordova (capitalization: Id):
  clientId: 'QTVsqmat06hTQQeavpR2j7SUuBijI2Lm',
  domain: 'doer-stage.eu.auth0.com',
  packageIdentifier: 'io.ionic.starter', // config.xml widget ID, e.g., com.auth0.ionic
  redirectUri: 'http://doer-local:8100',
  responseType: 'token id_token',
  scope: 'openid profile'
};
*/


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

/*
const auth0Config = {
  clientID: '5Svk7WPecVbRE165tCEYNWITRbVsIXE4',
  domain: 'baio.auth0.com',
  redirectUri: 'http://doer-local:8100',
  responseType: 'token id_token',
  scope: 'openid profile'
};
*/

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    StoreModule.forRoot(NgrxConstants.REDUCERS),
    EffectsModule.forRoot([RouterEffects, AuthEffects]),
    StoreDevtoolsModule.instrument(),
    DoerUserModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: AUTH_SERVICE_CONFIG, useValue: auth0Config },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: AuthService, useClass: Auth0ImplicitService}
  ]
})
export class AppModule {}
