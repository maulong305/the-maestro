 import { Component, OnInit } from '@angular/core';
import { Playlist } from '../model/playlist';
import { Song } from '../model/song';
import { PlaylistService } from '../service/playlist.service';
import { SongService } from '../service/song.service';
declare var $: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  showSongLike = true;
  showPlaylistLike = false;
  listPlaylistNew : Playlist[] = [];
  listSongMostView10 : Song[] = [];
  constructor(private playlistService: PlaylistService, private songService: SongService) {
  }

  ngOnInit(): void {
    // this.playlistService.latestPlaylist().subscribe( async listPlaylistNew => {
      // this.listPlaylistNew = listPlaylistNew;
       $(document).ready(() => {
        $('.slider-for').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true,
          asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
          slidesToShow: 5,
          slidesToScroll: 1,
          asNavFor: '.slider-for',
          dots: true,
          focusOnSelect: true
        });
      });
    // })
    // this.songService.getList10SongInTopView().subscribe( list10Song => {
    //   this.listSongMostView10 = list10Song;
    // })

  }
  songLike(){
    this.showSongLike = true;
    this.showPlaylistLike = false;
  }
  playlistLike(){
    this.showPlaylistLike = true;
    this.showSongLike = false;
  }
}
