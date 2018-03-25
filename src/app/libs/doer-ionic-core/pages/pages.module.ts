import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { PrimaryPageComponent } from './primary-page/primary-page.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    PrimaryPageComponent
  ],
  exports: [
    PrimaryPageComponent
  ],
  providers: []
})
export class PagesModule {}
