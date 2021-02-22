import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/model/playlist';
import { PlaylistService } from 'src/app/service/playlist.service';

@Component({
  selector: 'app-latest-playlists',
  templateUrl: './latest-playlists.component.html',
  styleUrls: ['./latest-playlists.component.css']
})
export class LatestPlaylistsComponent implements OnInit {
  latestPlaylist: Playlist[] = [];

  constructor(private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.playlistService.gestLatest().subscribe(list => {
      this.latestPlaylist = list;
    })
  }

}
