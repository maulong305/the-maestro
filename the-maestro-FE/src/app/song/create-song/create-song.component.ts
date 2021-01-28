import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Song } from 'src/app/model/song';
import { SongService } from 'src/app/service/song.service';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.css']
})
export class CreateSongComponent implements OnInit {
  song: Song = {};

  constructor(private activatedRoute: ActivatedRoute, private songService: SongService, private router: Router) { }

  ngOnInit(): void {
  }
  createSong(){
    // arrow function
    // (listSong, albumId) => {}
    return this.songService.createSong(this.song).subscribe(value => {
      this.song = value;
    })
  }

}
