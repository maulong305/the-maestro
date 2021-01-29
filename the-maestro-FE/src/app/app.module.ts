import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListSongComponent } from './song/list-song/list-song.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateSongComponent } from './song/create-song/create-song.component';

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
