import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, tap, switchMap} from 'rxjs/operators'
import {BehaviorSubject, from, Observable, Subject} from "rxjs";
import {Router} from "@angular/router";

const TOKEN_KEY = 'my-token';
interface user {
  [key: string]:any
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any = null;

  constructor(public http: HttpClient, private router: Router) {
  }

  getUsers() {
    return this.http.get<any[]>("http://localhost:8000/corkboard/users/").pipe(map(result => {
      return result;
    })
    );
  }
    // this.http.get<any[]>("http://localhost:8000/corkboard/users/").subscribe(users => {
    //   console.log(users);
    //   users.forEach((u) => {
    //     console.log(u.username);
    //     if (u.username === username) {
    //       this.user = u;
    //       return u;
    //     }
    //   })
    //   this.user = "None"
    //   return null;
    // })

  isLoggedIn(): boolean {
    return this.user != null;
  }

  getUser() {
    return this.user;
  }

  updateUser(user: any) {
    this.user = user;
  }

}
