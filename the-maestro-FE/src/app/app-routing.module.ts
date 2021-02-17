import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateSongComponent } from './song/create-song/create-song.component';
import { ListSongComponent } from './song/list-song/list-song.component';
import { PlaySongComponent } from './song/play-song/play-song.component';

const routes: Routes = [
  {
    path: 'songs/create/:username', component: CreateSongComponent
  },
  {
    path: 'songs/:username', component: ListSongComponent
  },
  {
    path: 'songs/:id', component: PlaySongComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: '', component: HomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
