import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBodyComponent } from './form-body/form-body.component';
import { FormLayoutComponent } from './form-layout/form-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';
import { FormFooterComponent } from './form-footer/form-footer.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ],
  declarations: [
      FormBodyComponent,
      FormLayoutComponent,
      FormFooterComponent
  ],
  exports: [
    FormLayoutComponent
  ],
  providers: []
})
export class FormModule {}
