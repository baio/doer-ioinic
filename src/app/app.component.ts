import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePageComponent } from './modules/doer-user/home-page/home-page.component';
import { AuthService } from './libs/doer-ngx-core/auth/auth.service';
import { Store } from '@ngrx/store';
import { ionicGoAction } from './libs/doer-ionic-core';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any =  HomePageComponent; // HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, auth: AuthService, store: Store<any>) {

    auth.handleAuthentication().then(x => {
      console.log('auth success', x);
      store.dispatch(ionicGoAction({name: 'home'}));
    }).catch(() => Promise.resolve(true));

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }
}

