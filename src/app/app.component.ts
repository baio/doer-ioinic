import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from './libs/doer-ngx-core/auth/auth.service';
import { Store } from '@ngrx/store';
import { ionicGoAction } from './libs/doer-ionic-core';
import { loginResultAction } from './libs/doer-ngx-core/ngrx/ngrx-auth/actions';
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
          // load users for this owner
          store.dispatch(loadUsersAction());
          store.dispatch(ionicGoAction({name: 'profile', animate: false}));
          if (res.fromStore) {
            // principal could be updated but token not
            console.log('set principal data!!!');
            return storage.get('principal').then(x => {
              if (x) {
                console.log('update store principal');
                store.dispatch(loadUsersAction());
              }
            });
          } else {
            // sync stored principal and one from token
            return storage.set('principal', res.principal);
          }
        } else {
          console.log('user not logined');
          store.dispatch(ionicGoAction({name: 'home', animate: false}));
        }
      })
    );

  }
}

