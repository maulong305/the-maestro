import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { UserDetail } from '../model/userDetail';
import { AuthService } from '../service/auth.service';
import { UserDetailService } from '../service/user-detail.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLogin = false;
  currentUser: any;
  userDetail: UserDetail = {};
  imgSrc: any;
  keyword: string | null = '';

  constructor(private userDetailService: UserDetailService, private authService: AuthService, private route: Router) {

  }

  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe(value => {
      this.currentUser = value;
      if (this.currentUser) {
        this.isUserLogin = true;
        this.userDetailService.getUserDetailByUserName(this.currentUser.username).subscribe(value1 => {
          this.userDetail = value1;
          this.imgSrc = this.userDetail.avatar;
        });
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  showProfile() {
    this.route.navigate(["/profile/" + this.currentUser.username]);
  }

  searchSongPlaylist() {
    this.route.navigate(['/search/' + this.keyword]);
  }
}
