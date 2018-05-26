import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicModule, Platform } from 'ionic-angular';
import { StorageService } from './ionic/storage.service';
import { StorageService as StorageWebService } from '@doer/ngx-core';
 import { Storage, IonicStorageModule } from '@ionic/storage';

export function getStorageService(platform: Platform, storage: Storage) {
  if (platform.platforms().indexOf('mobile') !== -1) {
    return new StorageService(storage);
  } else {
    console.log('initialize storage WEB service');
    return new StorageWebService();
  }
}

@NgModule({
    imports: [IonicModule, IonicStorageModule],
    declarations: []
})
export class StorageModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: StorageModule,
            providers: [
                {
                    provide: StorageWebService,
                    useFactory: getStorageService,
                    deps: [Platform, Storage]
                }
            ]
        };
    }
}
