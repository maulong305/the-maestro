import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { environment } from "src/environments/environment";

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      AngularFireModule.initializeApp(environment.firebaseConfig)
    ],
    exports: [AngularFireModule]
  })
  export class AppFirebaseModule { }