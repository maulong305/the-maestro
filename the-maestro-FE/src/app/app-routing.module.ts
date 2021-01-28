import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSongComponent } from './song/create-song/create-song.component';

const routes: Routes = [
  {
    path: '', component:CreateSongComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
