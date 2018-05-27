import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from './libs/doer-ngx-core/auth/auth.service';
import { Store } from '@ngrx/store';
import { ionicGoAction } from './libs/doer-ionic-core';
import { loginResultAction, storePrincipalAction, restorePrincipalAction } from '@doer/ngx-core';
import { ok } from './libs/doer-core';
import { AuthorizingPageComponent } from './modules/doer-user/authorizing-page/authorizing-page.component';
import { loadUsersAction } from './modules/doer-user/store/users';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any =  AuthorizingPageComponent; // HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    auth: AuthService,
    store: Store<any>,
    storage: Storage
  ) {


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    }).then(() =>
      auth.handleAuthentication().then(res => {
        if (res) {
          console.log('auth success', res);
          store.dispatch(loginResultAction(ok(res.principal)));
          // load users for this owner (on users effects)
          // store.dispatch(loadUsersAction());
          if (res.fromStored) {
            // principal could be updated but token not
            console.log('restore principal data from stored one');
            store.dispatch(restorePrincipalAction());
          } else {
            // sync stored principal and one from token
            console.log('store principal from token');
            store.dispatch(storePrincipalAction());
          }
          store.dispatch(ionicGoAction({name: 'workers-list', animate: false}));
        } else {
          console.log('user not logined');
          store.dispatch(ionicGoAction({name: 'home', animate: false}));
        }
      })
    );

  }
}

