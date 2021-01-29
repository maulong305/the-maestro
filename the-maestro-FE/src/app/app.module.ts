import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListSongComponent } from './song/list-song/list-song.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateSongComponent } from './song/create-song/create-song.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AppFirebaseModule } from './app-firebase/app-firebase.module';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
@NgModule({
  declarations: [
    AppComponent,
    CreateSongComponent,
    ListSongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppFirebaseModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
