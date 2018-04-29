import { NgModule } from "@angular/core";
import { HomePageComponent } from "./home-page.component";
import { IonicPageModule } from "ionic-angular";

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    IonicPageModule.forChild(HomePageComponent)
  ],
  entryComponents: [
    HomePageComponent
  ]
})
export class HomePageModule {}