import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Track } from 'ngx-audio-player';
import { Song } from 'src/app/model/song';
import { AuthService } from 'src/app/service/auth.service';
import { SongService } from 'src/app/service/song.service';

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.css']
})
export class ListSongComponent implements OnInit {
  listSong: Song[] = [];
  currentUser : any;

  constructor(private songService: SongService, private router: Router, private authService: AuthService) {
    this.authService.currentUserSubject.subscribe(value => {
      this.currentUser = value;
    });
   }

  ngOnInit(): void {
    this.songService.getAllSong(this.currentUser.username).subscribe(allSong => {
      this.listSong = allSong;
    })
  }
  addSong(){
    this.router.navigate(['/songs/create/' + this.currentUser.username])
  }
  deleteSong(id: number){
    if (confirm("Are you sure?")){
      console.log(id)
           this.songService.deleteSong(id,this.currentUser.username).subscribe( async song => {
          await this.router.navigate(['/songs/create/' + this.currentUser.username])
          await this.router.navigate(['/songs/' + this.currentUser.username])
        })  
    }
  }

}
