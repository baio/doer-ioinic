import { NgModule } from "@angular/core";
import { ProfilePageComponent } from "./profile-page.component";
import { IonicPageModule } from "ionic-angular";

@NgModule({
  declarations: [
    ProfilePageComponent
  ],
  imports: [
    IonicPageModule.forChild(ProfilePageComponent)
  ],
  entryComponents: [
    ProfilePageComponent
  ]
})
export class ProfilePageModule {}