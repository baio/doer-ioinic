import { NgModule } from "@angular/core";
import { IonicPageModule, IonicModule } from "ionic-angular";

import { RegisterOrgPageComponent } from "./register-org-page.component";
import { NgxFormModule, PagesModule } from "../../../../libs/doer-ionic-core";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    RegisterOrgPageComponent
  ],
  imports: [
    CommonModule,
    PagesModule,
    IonicModule,
    IonicPageModule.forChild(RegisterOrgPageComponent),
    NgxFormModule,
  ],
  entryComponents: [
    RegisterOrgPageComponent
  ]
})
export class RegisterOrgPageModule {}