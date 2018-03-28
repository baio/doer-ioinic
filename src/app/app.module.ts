import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DoerUserModule, RegisterOrgPageComponent } from './modules/doer-user';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterEffects } from './libs/doer-ionic-core';

const auth0Config = {
  clientID: 'fovIqg72k1N80mu9lyfu3oupwqCPArPv',
  domain: 'doer-stage.eu.auth0.com',
  responseType: 'token id_token',
  audience: 'https://doer-stage.eu.auth0.com/userinfo',
  redirectUri: 'http://localhost:3000/callback',
  scope: 'openid'
}


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([ RouterEffects ]),
    StoreDevtoolsModule.instrument(),
    DoerUserModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterOrgPageComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
