import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';

import { CreateWorkerPageComponent } from './create-worker-page.component';
import { NgxFormModule, PagesModule } from '../../../../libs/doer-ionic-core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CreateWorkerPageComponent],
  imports: [
    CommonModule,
    PagesModule,
    IonicModule,
    IonicPageModule.forChild(CreateWorkerPageComponent),
    NgxFormModule
  ],
  entryComponents: [CreateWorkerPageComponent]
})
export class CreateWorkerPageModule {}
