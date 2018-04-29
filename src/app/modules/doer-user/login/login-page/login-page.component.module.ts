import { NgModule } from "@angular/core";
import { IonicPageModule, IonicModule } from "ionic-angular";

import { LoginPageComponent } from "./login-page.component";
import { NgxFormModule, PagesModule } from "../../../../libs/doer-ionic-core";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    PagesModule,
    IonicModule,
    IonicPageModule.forChild(LoginPageComponent),
    NgxFormModule,
  ],
  entryComponents: [
    LoginPageComponent
  ]
})
export class LoginPageModule {}