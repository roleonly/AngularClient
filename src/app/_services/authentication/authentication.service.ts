import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { User } from "../../_models/";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public userSubject: BehaviorSubject<User>;
  isLoggedin: boolean = false;
  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(null as any);
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  Register(user_name: string, password: string) {
    const url: string = `${environment.apiUrl}auth/register/`;
    const body: any = { username: user_name, password: password };
    return this.http.post<any>(url, body)
    .pipe(map(res => {
      console.warn(res);
      const user: User = {
         username: user_name, access_token: res.access, refresh_token: res.refresh
      };
      this.userSubject.next(user);
      localStorage.setItem('user', JSON.stringify(user));
      this.isLoggedin=true ;
      return user;
    }));
  }
  logIn(user_name: string, password: string) {
    const url: string = `${environment.apiUrl}auth/token/login/`;
    const body: any = { username: user_name, password: password };
    return this.http.post<any>(url, body)
      .pipe(map(res => {
        const user: User = {
           username: user_name, access_token: res.access, refresh_token: res.refresh
        };
        this.userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.isLoggedin=true ;
        return user;
      }));
  }

  refreshToken() {
    const url: string = `${environment.apiUrl}auth/token/refresh/`;

    const body: any = {
      refresh : this.userValue.refresh_token
    };

    console.log(body);

    return this.http.post<any>(url, body)
      .pipe(map((token) => {
        const user: User = {
          
          username: this.userValue.username,
          access_token: token.access,
          refresh_token: this.userValue.refresh_token
        }
        this.userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }));
  }

  logout() {
    const url: string = `${environment.apiUrl}auth/token/logout/`;
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }
    let user=this.userValue;
    const body: any = { refresh_token:user.refresh_token }; 
    this.http.post<any>(url,body,options).subscribe();
      localStorage.removeItem('user');
      this.isLoggedin=false; 
      this.userSubject.next(null as any);    
  }

  isLoggedIn() {
    
    if (localStorage.getItem("user") == null) {
      this.isLoggedin = false;
      return false;
    }
    else {
      return true;
    }
  }
}