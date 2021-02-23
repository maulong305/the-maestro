import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { PlaySongComponent } from './song/play-song/play-song.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { JwtInterceptor } from './help/jwt-interceptor';
import { ErrorInterceptor } from './help/error-interceptor';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EditSongComponent } from './song/edit-song/edit-song.component';
import { LatestSongsComponent } from './song/latest-songs/latest-songs.component';
import { CreatePlaylistComponent } from './playlist/create-playlist/create-playlist.component';
import { ListPlaylistsComponent } from './playlist/list-playlists/list-playlists.component';
import { LatestPlaylistsComponent } from './playlist/latest-playlists/latest-playlists.component';
import { PlayPlaylistComponent } from './playlist/play-playlist/play-playlist.component';
@NgModule({
  declarations: [
    AppComponent,
    CreateSongComponent,
    ListSongComponent,
    PlaySongComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    EditSongComponent,
    LatestSongsComponent,
    CreatePlaylistComponent,
    ListPlaylistsComponent,
    LatestPlaylistsComponent,
    PlayPlaylistComponent
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
    BrowserAnimationsModule,
    NgxAudioPlayerModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
