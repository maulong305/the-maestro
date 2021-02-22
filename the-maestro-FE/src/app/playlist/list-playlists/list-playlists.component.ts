import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Playlist } from 'src/app/model/playlist';
import { AuthService } from 'src/app/service/auth.service';
import { PlaylistService } from 'src/app/service/playlist.service';

@Component({
  selector: 'app-list-playlists',
  templateUrl: './list-playlists.component.html',
  styleUrls: ['./list-playlists.component.css']
})
export class ListPlaylistsComponent implements OnInit {
  playlists: Playlist[] = [];
  currentUser: any;

  constructor(private playlistService: PlaylistService,private authService: AuthService, private router: Router) {
    this.authService.currentUserSubject.subscribe(value => {
      this.currentUser = value;
    });
   }

  ngOnInit(): void {
    this.playlistService.getAllPlayList(this.currentUser.username).subscribe(allplaylist => {
      this.playlists = allplaylist;
    })
  }
  addPlaylist(){
    this.router.navigate(['/playlists/create/' + this.currentUser.username])
  }


}
