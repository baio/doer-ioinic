import { NgModule } from '@angular/core';
import { ProfilePageComponent } from './profile-page.component';
import { IonicPageModule } from 'ionic-angular';
import { TakePhotoModule } from '@doer/native';

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [IonicPageModule.forChild(ProfilePageComponent), TakePhotoModule],
  entryComponents: [ProfilePageComponent]
})
export class ProfilePageModule {}
