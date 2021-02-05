import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../model/customer';
import { User } from '../model/user';
import { UserDetail } from '../model/userDetail';
import { AuthService } from './auth.service';

const API_URL = `${environment.apiUrl}`

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  currentUser: any;

  constructor(private authService: AuthService, 
    private http: HttpClient) {
      this.authService.currentUserSubject.subscribe(value => {
        this.currentUser = value;
        if(this.currentUser){}
      })
     }
     
     createNewUserDetail(userDetail: UserDetail): Observable<UserDetail>{
       return this.http.post<UserDetail>(API_URL + `/register`, userDetail);
     }
     createNewUser(user: User): Observable<User>{
       return this.http.post<User>(API_URL + `register`, user);
     }
     createNewCustomer(customer: Customer): Observable<Customer>{
       return this.http.post<Customer>(API_URL + `/register`, customer);
     }
     
}
