import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Song } from 'src/app/model/song';
import { SongService } from 'src/app/service/song.service';

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.css']
})
export class ListSongComponent implements OnInit {
  listSong: Song[] = [];

  constructor(private songService: SongService, private router: Router) { }

  ngOnInit(): void {
    this.songService.listSong().subscribe(allSong => {
      this.listSong = allSong;
    })
  }

}
