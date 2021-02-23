import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Track } from 'ngx-audio-player';
import { Playlist } from 'src/app/model/playlist';
import { AuthService } from 'src/app/service/auth.service';
import { PlaylistService } from 'src/app/service/playlist.service';

@Component({
  selector: 'app-play-playlist',
  templateUrl: './play-playlist.component.html',
  styleUrls: ['./play-playlist.component.css']
})
export class PlayPlaylistComponent implements OnInit {
  currentUser: any = {};
  playlist: Playlist = {};
  id?: number;
  track: Track[] = [];

  constructor(private playlistService: PlaylistService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) {
      this.authService.currentUserSubject.subscribe(value => {
        this.currentUser = value;
      });
      this.activatedRoute.paramMap.subscribe(paramMap => {
        let _id = paramMap.get('id');
        if(_id != null){
          this.id = parseInt(_id)
        } else {
          throw new Error("No ID in params")
        }
        this.getTrackPlaylist(this.id);
        this.getPlaylistById(this.id);
        this.playlist.id = this.id;
      })
     }

  ngOnInit(): void {
  }
  getTrackPlaylist(idPlaylist: number){
    this.playlistService.getTrackPlaylist(idPlaylist).subscribe(value => {
      this.track = value;
    })
  }
  getPlaylistById(idPlaylist: number){
    this.playlistService.getPlayListById(idPlaylist).subscribe(value => {
      this.playlist = value;
    })
  }

}
