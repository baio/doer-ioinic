import { NgModule } from "@angular/core";
import { RegisterOrgCompletePageComponent } from "./register-org-complete-page.component";
import { IonicPageModule } from "ionic-angular";

@NgModule({
  declarations: [
    RegisterOrgCompletePageComponent
  ],
  imports: [
    IonicPageModule.forChild(RegisterOrgCompletePageComponent)
  ],
  entryComponents: [
    RegisterOrgCompletePageComponent
  ]
})
export class RegisterOrgCompletePageModule {}