import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Playlist } from 'src/app/model/playlist';
import { AuthService } from 'src/app/service/auth.service';
import { PlaylistService } from 'src/app/service/playlist.service';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css']
})
export class CreatePlaylistComponent implements OnInit {
  playlist: Playlist = {};
  selectedImage: any = null;
  imgSrc: string = '';
  currentUser: any;
  username: any;
  createSuccess = false;

  constructor(private playlistService: PlaylistService, private activatedRoute: ActivatedRoute, private authService : AuthService, private router: Router, private storage: AngularFireStorage) {
    this.authService.currentUserSubject.subscribe(value => {
      this.currentUser = value;
    })
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async paramMap => {
      this.username = paramMap.get('username');

    })
  }

  createPlayList() {
    return this.playlistService.create(this.playlist, this.currentUser.username).toPromise();
  }
  submit() {
    const filePath = `${this.playlist.name}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(async url => {
          this.playlist.avatar = url;
          await this.createPlayList();
          this.createSuccess = true;
        });
      })
    ).subscribe();
  }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.selectedImage = null;
    }
  }

  cancel() {
    this.router.navigate(["/profile/" + this.currentUser.username]);
  }

}
