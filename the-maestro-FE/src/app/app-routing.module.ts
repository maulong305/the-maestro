import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSongComponent } from './song/create-song/create-song.component';
import { ListSongComponent } from './song/list-song/list-song.component';

const routes: Routes = [
  {
    path: 'songs/create', component: CreateSongComponent
  },
  {
    path: 'songs', component: ListSongComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
