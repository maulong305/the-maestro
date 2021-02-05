import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../model/customer';
import { User } from '../model/user';
import { UserDetailService } from '../service/user-detail.service';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  listUser : User[] = [] ;
  listUserName: string[] = [];

  customer: Customer ={};

  constructor(private userDetailService: UserDetailService, private router: Router) { }

  ngOnInit(): void {
  }

  register(){
      this.userDetailService.createNewCustomer(this.customer)
      .subscribe(() => {
        this.router.navigate(["/login"]);
      })
  }


}
