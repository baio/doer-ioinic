import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';

import { WorkersListPageComponent } from './workers-list-page.component';
import { NgxFormModule, PagesModule } from '@doer/ionic-core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [WorkersListPageComponent],
  imports: [
    CommonModule,
    PagesModule,
    IonicModule,
    IonicPageModule.forChild(WorkersListPageComponent),
    NgxFormModule
  ],
  entryComponents: [WorkersListPageComponent]
})
export class WorkersListPageModule {}
