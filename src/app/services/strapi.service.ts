import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { tap, catchError } from 'rxjs/operators';

export interface NewUser{
  username: string,
  email: string,
  password: string,
  confirmed: boolean
}

export interface UserGamesResponse{
  data : {
    id: number,
    attributes: {
      name : string,
      jiraIds: {
        id: string,
        votes:number[]
      }[],
      status:string,
    }
  }[],
  meta : {
    pagination:{
      page: number, 
      pageSize: number, 
      pageCount: number, 
      total: number 
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class StrapiService {

  isAuth$ = new BehaviorSubject<boolean>(this.hasToken());
  userID:string = "";

  private rootUrl: string = "http://localhost:1337";
  private headers = {'Authorization': 'Bearer cb96cf6e1cfbea005242e399f56ab89027ff3c0c336201edd976783f04a3810dfc58a0e60782526c3acfd8722cb00e9adc0f3aabb6612e1244b95fc9ed8ffd1ded9ed1feaa51650501536ef6e71233a9c622cb3e58d7081d604f15dcc329b31a19a43e482dd1d386bbf79fbb21bdb6d799e1e203ad5c140301f1fd4412f63fcf'};
  private userHeaders = {'Authorization': 'Bearer ' + this.cookieService.get('ppjwt')};

  private hasToken() : boolean {
    return !!this.cookieService.get('ppjwt');
  }
  
  addUser(data: NewUser){
    return this.http.post<any>(this.rootUrl + '/api/users', data, { headers: this.headers} );
  }

  getUserID(){
    return this.http.get<any>(this.rootUrl + '/api/users/me', { headers: this.userHeaders});
  }

  getUserGames(id:string){
    return this.http.get<UserGamesResponse>(this.rootUrl + '/api/games/?filters[users_permissions_user][id][$eq]=' + id, { headers: this.headers} );
  }

  loginUser(data:any){
    return this.http.post<any>(this.rootUrl + '/api/auth/local', data, {headers: this.headers});
  }

  isAuthenticated() : Observable<boolean> {
   return this.isAuth$.asObservable();
  }

  constructor(private http:HttpClient, private cookieService:CookieService) { }
}


