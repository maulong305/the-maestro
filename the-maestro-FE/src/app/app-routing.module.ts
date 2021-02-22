import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './help/auth-guard';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { CreateSongComponent } from './song/create-song/create-song.component';
import { EditSongComponent } from './song/edit-song/edit-song.component';
import { LatestSongsComponent } from './song/latest-songs/latest-songs.component';
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
    path: 'playsong/:id', component: PlaySongComponent
  },  
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: '', component: HomePageComponent
  },
  {
    path: 'profile/:username',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'songs/edit/:username/:id',
    component: EditSongComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'latestSongs',
    component: LatestSongsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
