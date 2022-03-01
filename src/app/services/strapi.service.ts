import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export interface NewUser{
  username: string,
  email: string,
  password: string,
  confirmed: boolean
}

@Injectable({
  providedIn: 'root'
})
export class StrapiService {

  isAuth$ = new BehaviorSubject<boolean>(this.hasToken());

  private rootUrl: string = "http://localhost:1337";
  private headers = {'Authorization': 'Bearer cb96cf6e1cfbea005242e399f56ab89027ff3c0c336201edd976783f04a3810dfc58a0e60782526c3acfd8722cb00e9adc0f3aabb6612e1244b95fc9ed8ffd1ded9ed1feaa51650501536ef6e71233a9c622cb3e58d7081d604f15dcc329b31a19a43e482dd1d386bbf79fbb21bdb6d799e1e203ad5c140301f1fd4412f63fcf'};

  private hasToken() : boolean {
    return !!this.cookieService.get('ppjwt');
  }
  
  addUser(data: NewUser){
    return this.http.post<any>(this.rootUrl + '/api/users', data, { headers: this.headers} );
  }

  loginUser(data:any){
    return this.http.post<any>(this.rootUrl + '/api/auth/local', data, {headers: this.headers});
  }

  isAuthenticated() : Observable<boolean> {
   return this.isAuth$.asObservable();
  }

  constructor(private http:HttpClient, private cookieService:CookieService) { }
}


