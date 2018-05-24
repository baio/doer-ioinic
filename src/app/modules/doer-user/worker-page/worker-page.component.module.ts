import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';

import { WorkerPageComponent } from './worker-page.component';
import { NgxFormModule, PagesModule } from '@doer/ionic-core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [WorkerPageComponent],
  imports: [
    CommonModule,
    PagesModule,
    IonicModule,
    IonicPageModule.forChild(WorkerPageComponent),
    NgxFormModule
  ],
  entryComponents: [WorkerPageComponent]
})
export class WorkerPageModule {}
