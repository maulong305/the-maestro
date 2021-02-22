import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Track } from 'ngx-audio-player';
import { Playlist } from 'src/app/model/playlist';
import { Song } from 'src/app/model/song';
import { AuthService } from 'src/app/service/auth.service';
import { PlaylistService } from 'src/app/service/playlist.service';
import { SongService } from 'src/app/service/song.service';

@Component({
  selector: 'app-play-song',
  templateUrl: './play-song.component.html',
  styleUrls: ['./play-song.component.css']
})
export class PlaySongComponent implements OnInit {

  id: any;
  song: Song = {};
  showFullLyric = true;

  singleTrack: Track[] = [
    {
      link: '',
      title: ''
    }
  ];
  listPlaylist: Playlist[] = [];
  currentUser: any = {};
  idPlaylist: number | undefined;
  constructor(private songService: SongService, 
              private activatedRoute: ActivatedRoute,
              private playlistService: PlaylistService,
              private authService: AuthService) {
    this.activatedRoute.paramMap.subscribe ( param => {
      this.id = param.get("id");
      this.getTrack(this.id)
      this.song.id = this.id
    });
    this.authService.currentUserSubject.subscribe(value1 => {
      this.currentUser = value1;
      this.getAllPlaylistByUsername(this.currentUser.username);
    })
   }

  ngOnInit(): void {
    this.getTrack(this.id);
  }
  getTrack(id: number){
    this.songService.getSongById(id).subscribe(value => {
      this.song = value;
      this.singleTrack[0].title = value.name + '';
      this.singleTrack[0].link = value.file + '';
    })
  }
  collapseLyric(){
    this.showFullLyric = !this.showFullLyric;
  }
  addSongToPlaylist(id: number, idPlaylist: number) {
    this.playlistService.addSongToPlaylist(id, idPlaylist).subscribe(value => {
      if (value == null) {
        alert('The song in playlist already');
      } else {
        alert('Add songs to playlist successfully');
        this.getAllPlaylistByUsername(this.currentUser.username);
      }
    });
  }
  getAllPlaylistByUsername(username: string) {
    this.playlistService.getAllPlayList(username).subscribe(value => {
      this.listPlaylist = value;
    });
  }

}
