import { NgModule, ModuleWithProviders } from '@angular/core';
import { ToastrModule as NgxToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule, Platform, ToastController } from 'ionic-angular';
import { ToastrService as NgxToastrService } from '@doer/ngx-core';
import { ToastService } from './ionic/toast.service';

export function getToastrService(
  platform: Platform,
  toastrService: NgxToastrService,
  toastController: ToastController
) {
  if (platform.platforms().indexOf('mobile') !== -1) {
    return new ToastService(toastController);
  } else {
    return toastrService;
  }
}

@NgModule({
  imports: [IonicModule, NgxToastrModule, BrowserAnimationsModule],
  declarations: []
})
export class ToastModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ToastModule,
      providers: [
        NgxToastrService,
        {
          provide: NgxToastrService,
          useFactory: ToastService,
          deps: [Platform, NgxToastrService, ToastController]
        }
      ]
    };
  }
}
