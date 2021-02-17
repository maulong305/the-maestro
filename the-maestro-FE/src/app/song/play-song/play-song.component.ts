import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Track } from 'ngx-audio-player';
import { Song } from 'src/app/model/song';
import { SongService } from 'src/app/service/song.service';

@Component({
  selector: 'app-play-song',
  templateUrl: './play-song.component.html',
  styleUrls: ['./play-song.component.css']
})
export class PlaySongComponent implements OnInit {

  id: any;
  song: Song = {};

  singleTrack: Track[] = [
    {
      link: '',
      title: ''
    }
  ];

  constructor(private songService: SongService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe ( param => {
      this.id = param.get("id");
      this.getTrack(this.id)
    })
   }

  ngOnInit(): void {
    this.getTrack(this.id);
  }
  getTrack(id: number){
    this.songService.getSongById(id).subscribe(value => {
      this.singleTrack[0].title = value.name + '';
      this.singleTrack[0].link = value.file + '';
    })
  }

}
