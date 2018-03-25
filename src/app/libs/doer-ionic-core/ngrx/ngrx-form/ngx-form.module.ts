import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { FormModule } from '../../form';
import { NgrxFormLayoutComponent } from './ngrx-form-layout/ngrx-form-layout.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormModule
  ],
  declarations: [
    NgrxFormLayoutComponent
  ],
  exports: [
    NgrxFormLayoutComponent
  ],
  providers: []
})
export class NgxFormModule {}
