import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DoerUserModule } from './modules/doer-user';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterEffects } from './libs/doer-ionic-core';
import { NgrxConstants, AuthService, AUTH_SERVICE_CONFIG, Auth0Service, authReducer } from './libs/doer-ngx-core';

/*
const auth0Config = {
  clientID: 'QTVsqmat06hTQQeavpR2j7SUuBijI2Lm',
  domain: 'doer-stage.eu.auth0.com',
  responseType: 'token id_token',
  audience: 'https://doer-stage.eu.auth0.com/userinfo',
  redirectUri: 'http://localhost:3000/callback',
  scope: 'openid'
}
*/

/*
const auth0Config = {
  clientID: '5Svk7WPecVbRE165tCEYNWITRbVsIXE4',
  domain: 'baio.auth0.com',
  responseType: 'token id_token',
  audience: 'https://baio.auth0.com/userinfo',
  redirectUri: 'http://localhost:8100/auth-callback',
  scope: 'openid offline_access'
};
*/

const auth0Config = {
  // Needed for Auth0 (capitalization: ID):
  clientID: 'X3yEjXwCq4hYGtsOfFB6vTTB7Qeq2Uty',
  // Needed for Auth0Cordova (capitalization: Id):
  clientId: 'X3yEjXwCq4hYGtsOfFB6vTTB7Qeq2Uty',
  domain: 'baio.auth0.com',
  packageIdentifier: 'io.ionic.starter', // config.xml widget ID, e.g., com.auth0.ionic
  redirectUri: 'http://doer-local:8100',
  responseType: 'token id_token',
  scope: 'openid profile'
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    StoreModule.forRoot(NgrxConstants.REDUCERS),
    EffectsModule.forRoot([RouterEffects]),
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
    {provide: AuthService, useClass: Auth0Service}
  ]
})
export class AppModule {}
