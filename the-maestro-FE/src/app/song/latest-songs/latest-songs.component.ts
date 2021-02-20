import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/model/song';
import { SongService } from 'src/app/service/song.service';

@Component({
  selector: 'app-latest-songs',
  templateUrl: './latest-songs.component.html',
  styleUrls: ['./latest-songs.component.css']
})
export class LatestSongsComponent implements OnInit {
  latestSongs: Song[] = [];

  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.songService.getLatest().subscribe(list => {
      this.latestSongs = list;
    })
  }

}
