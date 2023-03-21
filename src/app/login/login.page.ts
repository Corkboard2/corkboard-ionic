import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";


interface user {
  [key: string]:any
}

@Component({
  selector: 'login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.css']
})
export class LoginPage {
  userFound = true;
  username = "";
  first_name = "";
  last_name = "";
  constructor(public http: HttpClient, private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  login() {
    let users = this.authService.getUsers()
    console.log(users);
    users.subscribe((users) => {
      users.forEach((u) =>
      {
        if(u['username'] === this.username) {
          console.log("logging in for", this.username);
          this.authService.updateUser(u);
          this.userFound = true;
          this.router.navigate(['../tabs'], {relativeTo: this.route});
        }
      })
      if(!this.userFound) {
        console.log("creating account for", this.username)
        this.userFound = false;
      }
    })
  }
  create_account() {
    // this.http.post...
    let data = {
      'username': this.username,
      'first_name': this.first_name,
      'last_name': this.last_name,
      'first_dish': 3,
      'second_dish': 3,
      'third_dish': 3,
      'fourth_dish': 3,
      'fifth_dish': 3,
    }
    this.http.post('http://localhost:8000/corkboard/users/', data).subscribe((r)=>{
      console.log(r)
      this.username = "";
      this.router.navigate(['../tabs'], {relativeTo: this.route});
    })
  }
}
