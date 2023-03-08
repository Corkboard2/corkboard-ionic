import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap, switchMap } from 'rxjs/operators'
import { BehaviorSubject, from, Observable, Subject } from "rxjs";

const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any = null;
  constructor(public http: HttpClient) {
  }

  login(username: any): any {
    this.http.get<any[]>("http://localhost:8000/corkboard/users").subscribe((users)=>{
      console.log(users);
      users.forEach((u)=> {
        if(u.username == username) {
          this.user = u;
          return u;
        }
      })
      return null;
    })
  }

  isLoggedIn(): boolean {
    return this.user != null;
  }
  getUser() {
    return this.user;
  }

}
